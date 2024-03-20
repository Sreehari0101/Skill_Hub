import React from 'react'
import TitleCard from '../../Components/TitleCard';
import ProfileCard from '../../Components/ProfileCard';
import "./css/RecruitmentsApply.css";
import profile_icon from "../../assets/Profile_icon.jpg";
import RecruitmentForm from '../../Components/RecruitmentForm';
import { useParams } from 'react-router-dom'; 

function RecruitmentsApply() {
  const { jobId } = useParams();
  return (
    <div className="Recruitments-apply">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="Application Form" />
        </div>

        <div className="profile-content">
          <ProfileCard userName="Richu Das" userIcon={profile_icon} />
        </div>
      </div>
      <div className="Content-bottom"> 
      < RecruitmentForm jobId={jobId} />
      </div>
    </div>
  );
}

export default RecruitmentsApply