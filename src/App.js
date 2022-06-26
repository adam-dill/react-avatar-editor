import React, { useState } from 'react';
import EditorModal from './components/EditorModal';

const App = () => {
    const [show, setShow] = useState(false);
    
    const handleUploadClick = (e) => {
        setShow((previous) => !previous);
    }

    return (
        <div className="App">
            {show && <EditorModal toggleModal={handleUploadClick} />}
            <button onClick={handleUploadClick}>Upload/Edit Your Profile Picture</button>
        </div>
    );
}

export default App;
