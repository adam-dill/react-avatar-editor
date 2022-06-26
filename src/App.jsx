import React, { useState } from 'react';
import EditorModal from './components/EditorModal';
import ImageDisplay from './components/ImageDisplay';
import Placeholder from './assets/placeholder.jpg';

const App = () => {
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(Placeholder);
    
    const handleUploadClick = (e) => {
        setShow((previous) => !previous);
    }
    
    const handleOnSave = (image) => {
        setImage(image);
        setShow(false);
    }

    return (
        <>
            {show && (
                <EditorModal 
                    imageDisplay={image}
                    toggleModal={handleUploadClick} 
                    onSave={handleOnSave} />
            )}
            <ImageDisplay 
                image={image} 
                onClick={handleUploadClick} />
        </>
    );
}

export default App;
