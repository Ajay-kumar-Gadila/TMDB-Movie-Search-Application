import React, { useState } from "react";
import TrendingToday from "./TrendingToday";
import TrendingWeek from "./TrendingWeek";

function ToggleButton() {
  const [position, setPosition] = useState("button-left");
  const [cardType, setCardType] = useState('today'); 

  const leftClick = () => {
    setPosition("button-left");
    setCardType("today");
  };

  const rightClick = () => {
    setPosition("button-right");
    setCardType("week");
  };

  return (
    <div className="form-box">
      <div className="button-box">
        <div id="btn" className={position}></div>
        <div className="button-text">
          <button type="button" className="toggle-btn custom-btn1" id="today-text"onClick={leftClick}>
            Today
          </button>
          <button type="button" className="toggle-btn custom-btn2" onClick={rightClick}>
            Week
          </button>
        </div>
      </div>
      <div className="card-container">
        {cardType === "today" && <TrendingToday />}
        {cardType === "week" && <TrendingWeek />}
      </div>
    </div>
  );
}

export default ToggleButton;
