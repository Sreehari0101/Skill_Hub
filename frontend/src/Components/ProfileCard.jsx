import React from 'react'
import "./css/Profilecard.css";
import profile_icon from "./../assets/profile_icon.jpeg";


function ProfileCard() {
  return (
    <div className="profile-card">
         <button className="button">
         <div className="profile-button-content">
              <div className="profile-user-name"> </div>
                <div className="profile-icon-container">
                  <img
                    className="profile-icon"
                    src={profile_icon}
                    alt="Icon"
                  />
                </div>
            </div>
            </button>

    </div>
  )
}

export default ProfileCard