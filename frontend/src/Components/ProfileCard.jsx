import React from "react";
import "./css/Profilecard.css";

function ProfileCard({ userName, userIcon }) {
  return (
    <div className="profile-card">
      <button className="button">
        <div className="profile-button-content">
          <div className="profile-user-name">{userName}</div>
          <div className="profile-icon-container">
            <img className="profile-icon" src={userIcon} alt="Icon" />
          </div>
        </div>
      </button>
    </div>
  );
}

export default ProfileCard;
