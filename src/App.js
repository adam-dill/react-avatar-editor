import React, { useState } from 'react';
import EditorModal from './components/EditorModal';
import Placeholder from './assets/placeholder.jpg';
import CameraIcon from './assets/camera-icon.svg';

const App = () => {
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(Placeholder);
    
    const handleUploadClick = (e) => {
        setShow((previous) => !previous);
    }
    
    const handleOnSave = (image) => {
        console.log('save', image)
        setImage(image);
        setShow(false);
    }

    return (
        <>
            {show && (
                <EditorModal 
                    imageDisplay={image}
                    toggleModal={handleUploadClick} 
                    onSave={handleOnSave}/>
            )}
            <div className="image-container">
                <div className="image-upload">
                    <button onClick={handleUploadClick}>
                        <img src={CameraIcon} className="image-upload-icon" alt=""/>
                    </button>
                </div>
                <img src={image} alt="" className="display-image" />
            </div>
        </>
    );
}

export default App;
