import React from "react";
import "./css/Chatcard.css";
import JoinChat_icon from "./../assets/JoinChat_icon.png";
import { Link } from 'react-router-dom'

function Chatcard({ imageSrc, altText, chatroomName,chatroomDescription,studentsJoined }) {
  return (
    <div className="Chat-card">
      <div className="Chat-card-image-container">
        <img className="Chat-card-image" src={imageSrc} alt={altText} />
      </div>
      <div className="Chat-card-body">
        <div className="Chat-card-body-top">
          <h1 className="Chat-card-body-heading">{chatroomName}</h1>
          <p className="Chat-card-body-description">
          {chatroomDescription}
          </p>
          <hr className="horizontal-line" />
        </div>

        <div className="Chat-card-body-bottom">
          <div className="Chat-card-body-joined">
            <h1> {studentsJoined}</h1>
            <p>JOINED</p>
          </div>
          <div className="Chat-card-body-join">
          <Link to="/student-discussions-join">
            <button className="button">
              <div className="join-button-content">
                <div className="icon_container">
                  <img
                    className="join-chat-icon"
                    src={JoinChat_icon}
                    alt="Icon"
                  />
                </div>
                <div className="join-chat-text">JOIN CHAT</div>
              </div>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatcard;
