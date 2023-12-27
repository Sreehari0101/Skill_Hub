import React from "react";
import "./css/Chatbot.css";
import ProfileCard from "../../Components/ProfileCard";
import profile_icon from "../../assets/Profile_icon.jpg";
import title_icon from "../../assets/chatbot_title_icon.png";
import sendIcon from "../../assets/send_symbol_icon.png";
import TitleCard from "../../Components/TitleCard";

function Chatbot() {
  return (
    <div class="Chat-bot">
      <div className="Content-top">
        <div className="icon-content">
          <img src={title_icon} className="title-icon" alt="title-icon" />
        </div>
        <div className="title-content">
          <TitleCard titleName="SkillSage" />
        </div>

        <div className="profile-content">
          <ProfileCard userName="Richu Das" userIcon={profile_icon} />
        </div>
      </div>
      <div className="Content-bottom">
        <div className="message-display">
          <div className="message-reply">
            Hello there. I’m your friendly learning companion here to help you.
            How can I support your learning today?
          </div>
          <div className="my-message">
            What course should I learn to develop my python language?
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

export default Chatbot;
