import React from 'react'
import "./css/MentorUploadNotes.css";
import TitleCard from '../../Components/TitleCard';
import ProfileCard from '../../Components/ProfileCard';
import UploadNotes from '../../Components/UploadNotes';
function MentorUploadNotes() {
  return (
    <div className="Mentor-upload-notes">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="Course Notes" />
        </div>

        <div className="profile-content">
          <ProfileCard />
        </div>
      </div>
      <div className="Content-bottom">
      <h1>Course Notes</h1>
     <UploadNotes />
      </div>
      </div>
  );
}

export default MentorUploadNotes