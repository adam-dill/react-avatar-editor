import React, { useState, useRef } from 'react';
import AvatarEditor from '../AvatarEditor';
import Slider from '../Slider';
import CameraIcon from '../../assets/camera-icon.svg';
import RotateIcon from '../../assets/rotate-icon.svg';
import styles from './index.module.scss';

const EditorModal = ({toggleModal, onSave, imageDisplay}) => {
    const editor = useRef(null);
    const fileUpload = useRef(null);
    const [image, setImage] = useState(imageDisplay);
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [rotationShift, setRotationShift] = useState(0);

    const handleFile = () => {
        const files = fileUpload.current.files;

        if (files && files[0]) {
            setImage(files[0]);
        }
    }

    const handleZoomChange = (value) => {
        setZoom(mapRange(value, 0, 100, 0.5, 1.5));
    }

    const handleRotationChange = (value) => {
        setRotation(mapRange(value, 0, 100, -45, 45))
    }

    const handleRotationShift = () => {
        setRotationShift((previous) => {
            let newValue = previous + 90;
            if (newValue >= 360) {
                newValue = newValue - 360;
            }
            return newValue;
        })
    }

    const handleSaveClick = async () => {
        if (editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            //const canvas = editor.current.getImage(); // or editor.current.getImageScaledToCanvas()
            const dataUrl = editor.current.getImageScaledToCanvas().toDataURL("image/jpeg")
            const result = await fetch(dataUrl)
            const blob = await result.blob()
        
            const image = window.URL.createObjectURL(blob)
            onSave(image);
          }
    }

    const mapRange = (number, in_min, in_max, out_min, out_max) => {
        return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    return (
        <div className={styles["editor-modal"]}>
            <div className={styles["modal-content"]}>
                <AvatarEditor
                    ref={editor}
                    width={350}
                    height={350}
                    image={image}
                    scale={zoom}
                    rotate={(rotation + rotationShift)}
                    backgroundColor="#000"
                    showGrid={true}
                    gridColor="#666"  />
                
                <div className={styles["controls"]}>
                    <div className={styles["image-upload"]}>
                        <label htmlFor="imageUpload">
                            <img src={CameraIcon} className={styles["image-upload-icon"]} alt=""/>
                        </label>
                        <input ref={fileUpload} className="sr-only" id="imageUpload" type="file" onChange={handleFile} />
                    </div>
                    <button onClick={handleRotationShift} className={styles["rotate-button"]}>
                        <label className="sr-only">Rotate</label>
                        <img src={RotateIcon} alt="" />
                    </button>
                    <Slider label="rotation" initialValue={50} onChange={handleRotationChange} />
                    <Slider label="zoom" initialValue={50} onChange={handleZoomChange} />
                    <div>
                        <button className={styles["cancel-button"]} onClick={toggleModal}>Cancel</button>
                        <button className={styles["save-button"]} onClick={handleSaveClick}>Save</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

EditorModal.defaultProps = {
    onSave: () => {}
}

export default EditorModal;