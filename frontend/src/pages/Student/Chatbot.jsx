import React, { useState } from "react";
import "./css/Chatbot.css";
import ProfileCard from "../../Components/ProfileCard";
import title_icon from "../../assets/chatbot_title_icon.png";
import profile_icon from "../../assets/Profile_icon.jpg";
import sendIcon from "../../assets/send_symbol_icon.png";
import TitleCard from "../../Components/TitleCard";

function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    "Hello there. I’m your friendly learning companion here to help you. How can I support your learning today?",
  ]);

  const handleUserInput = (e) => {
    console.log("User input changed:", e.target.value);
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() !== "") {
      console.log("Sending message:", userInput);

      try {
        const response = await fetch("http://localhost:8000/chatbot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userInput }),
        });

        const data = await response.json();
        console.log("Received response from backend:", data);

        setChatHistory([
          ...chatHistory,
          userInput, 
          data.chatbotReply,
        ]);
        setUserInput("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="Chat-bot">
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
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={index % 2 === 0 ? "message-reply" : "my-message"}
            >
              {message}
            </div>
          ))}
        </div>

        <div className="message-type">
          <div className="message-type-area">
            <div className="message-textbox">
              <input
                type="text"
                className="custom-textbox"
                placeholder="Type your prompt."
                value={userInput}
                onChange={handleUserInput}
              />
            </div>
          </div>

          <div className="message-send-area">
            <button className="button" onClick={sendMessage}>
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
