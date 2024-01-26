import React from 'react'
import "./css/WelcomeBox.css";

function WelcomeBox({welcomeImage,date,welcomeText}) {
  return (
    <div className="welcome-box">
    <img className="welcome-image" src={welcomeImage} alt="welcome" />
    <p className="date-text">{date}</p>
    <h1 className="welcome-text">{welcomeText}</h1>
  </div>
  )
}

export default WelcomeBox