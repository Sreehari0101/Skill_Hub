import React from "react";
import "./css/RecruiterCreate.css";
import TitleCard from '../../Components/TitleCard';
import ProfileCard from '../../Components/ProfileCard';
import profile_icon from "../../assets/Profile_icon.jpg";
import JobForm from "../../Components/JobForm";

function RecruiterCreate() {
  return (
    <div className="Recruiter-create">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="Job Details" />
        </div>

        <div className="profile-content">
          <ProfileCard userName="Richu Das" userIcon={profile_icon} />
        </div>
      </div>
      <div className="Content-bottom">
        <JobForm />
      </div>
    </div>
  );
}

export default RecruiterCreate;
