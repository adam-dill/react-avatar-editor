import React, { useState, useRef } from 'react';
import AvatarEditor from './components/AvatarEditor';
import Slider from './components/Slider';

function App() {
    const fileUpload = useRef(null);
    const [image, setImage] = useState();
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

    const mapRange = (number, in_min, in_max, out_min, out_max) => {
        return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
    
    return (
        <div className="App">
            <input ref={fileUpload} type="file" onChange={handleFile}></input>
            <div className="controls">
                <button onClick={handleRotationShift}>shift 90</button>
                <Slider label="rotation" initialValue={50} onChange={handleRotationChange} />
                <Slider label="zoom" initialValue={50} onChange={handleZoomChange} />
            </div>
            <AvatarEditor
                image={image}
                scale={zoom}
                rotate={(rotation + rotationShift)} />
        </div>
    );
}

export default App;
