import React from "react";
import "./css/JoinChat.css";
import TitleCard from "../Components/TitleCard";
import ProfileCard from "../Components/ProfileCard";
import profile_icon from "../assets/Profile_icon.jpg";
import sendIcon from "../assets/send_symbol_icon.png";

function JoinChat() {
  return (
    <div className="Join-chat">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="Chat Room" />
        </div>

        <div className="profile-content">
          <ProfileCard />
        </div>
      </div>
      <div className="Content-bottom">
        <div className="message-display">
          <div className="my-message">
          Hey Guys Wassup
          </div>
          <div className="message-reply">
            <h1>Reshab Parakkadan</h1>
            <p>Hello there. I’m your friendly learning companion here to help you.
            How can I support your learning today?</p>
          </div>
        </div>
        <div className="message-type">
          <div className="message-type-area">
            <div className="message-textbox">
              <input
                type="text"
                className="custom-textbox"
                placeholder="Type your prompt."
              />
            </div>
          </div>

          <div className="message-send-area">
            <button className="button">
              <div className="send-button-content">
                <img
                  src={sendIcon}
                  className="send-button-icon"
                  alt="send-button-icon"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinChat;
