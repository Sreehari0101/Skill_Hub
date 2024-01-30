import React from 'react'
import CourseDetailCard from "../../Components/CourseDetailCard";
import TitleCard from "../../Components/TitleCard";
import ProfileCard from "../../Components/ProfileCard";
import "./css/CourseDetails.css";
import profile_icon from "../../assets/Profile_icon.jpg";

function CourseDetails() {
  return (
    <div className='Course-details'>
        <div className="Content-top">
          <div className="title-content">
            <TitleCard titleName="Course Details" />
          </div>

          <div className="profile-content">
            <ProfileCard userName="Richu Das" userIcon={profile_icon} />
          </div>
        </div>
        <div className='Content-bottom'>
            
        </div>






    
    </div>
  )
}

export default CourseDetails