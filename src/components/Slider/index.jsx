import React, { useState } from 'react'

const Slider = ({label, initialValue, onChange}) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(parseFloat(e.target.value));
    }

    return (
        <div className="slider-container">
            <label>{label}</label>
            <input type="range" value={value} onChange={handleChange} />
        </div>
    )
}

Slider.defaultProps = {
    initialValue: 0,
    onChange: () => {}
  }

export default Slider;