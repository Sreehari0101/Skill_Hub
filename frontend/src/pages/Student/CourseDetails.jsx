import React from "react";
import CourseDetailCard from "../../Components/CourseDetailCard";
import TitleCard from "../../Components/TitleCard";
import ProfileCard from "../../Components/ProfileCard";
import "./css/CourseDetails.css";
import profile_icon from "../../assets/Profile_icon.jpg";
import Cover1 from "../../assets/Data_Analytics_Course_icon.jpg";

function CourseDetails() {
  return (
    <div className="Course-details">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="Course Details" />
        </div>

        <div className="profile-content">
          <ProfileCard userName="Richu Das" userIcon={profile_icon} />
        </div>
      </div>
      <div className="Content-bottom">
        <CourseDetailCard
          courseCover={Cover1}
          courseName="The Data Analyst Course: Complete Data Analyst Bootcamp"
          courseOwner="Sundas Khalid"
          courseRating={4.5}
          courseMembers="10K"
          courseBio="The Data Analyst Course offers a comprehensive bootcamp, equipping learners with skills in data analysis. Covering tools, techniques, and real-world applications for a successful career in data analysis."
        />
      </div>
    </div>
  );
}

export default CourseDetails;
