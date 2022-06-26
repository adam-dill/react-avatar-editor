import React from 'react'
import CameraIcon from '../../assets/camera-icon.svg';
import styles from './index.module.scss';

const ImageDisplay = ({image, onClick}) => {
    return (
        <>
        <div className={styles["image-container"]}>
            <div className={styles["image-upload"]}>
                <button onClick={onClick}>
                    <img src={CameraIcon} className={styles["image-upload-icon"]} alt="" />
                </button>
            </div>
            <img src={image} alt="" className={styles["display-image"]} />
        </div>
        </>
    )
}

export default ImageDisplay;