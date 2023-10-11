import React, { useState } from 'react';

function ToggleButton() {
  const [position, setPosition] = useState('button-left'); // Start with 'button-left' class

  const leftClick = () => {
    setPosition('button-left');
  };

  const rightClick = () => {
    setPosition('button-right');
  };

  return (
    <div className="form-box">
      <div className="button-box">
        <div id="btn" className={position}></div>
        <div className='button-text'>
        <button type="button" className="toggle-btn" onClick={leftClick}>
          Today
        </button>
        <button type="button" className="toggle-btn" onClick={rightClick}>
          This Week 
        </button>
        </div>
      </div>
    </div>
  );
}

export default ToggleButton;
