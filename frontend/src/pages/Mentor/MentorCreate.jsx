import React from 'react'
import "./css/MentorCreate.css";
import TitleCard from '../../Components/TitleCard';
import ProfileCard from '../../Components/ProfileCard';
import profile_icon from "../../assets/Mentor_Profile_photo.jpg";
import CourseForm from '../../Components/CourseForm';
import Dropzone from '../../Components/Dropzone';
function MentorCreate() {
  return (
    <div className="Mentor-create">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="Create Course" />
        </div>

        <div className="profile-content">
          <ProfileCard userName="Leo Das" userIcon={profile_icon} />
        </div>
      </div>
      <div className="Content-bottom">
      <h1>Couse Information</h1>
     <CourseForm />
     <h1>Course Content</h1>
        <Dropzone />
      </div>
      </div>
  );
}

export default MentorCreate