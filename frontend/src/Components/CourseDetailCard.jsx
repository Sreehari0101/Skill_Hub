import React from "react";
import "./css/CourseDetailCard.css";
import Rating_icon from "./../assets/Rating_star_icon.png";

function CourseDetailCard({courseCover,courseName,courseOwner,courseRating,courseMembers,courseBio}) {
  const BASE_URL = "http://localhost:8000";
  return (
    <div className="Course-box">
      <div className="Course-description">
        <h1>{courseName}</h1>
        <h4>{courseOwner}</h4>
        <div className="Course-survey">
          <div className="rating-container">
            <img className="rating-icon" src={Rating_icon} alt="Icon" />
          </div>
          <div className="survey-details">
            <p>{courseRating} ({courseMembers})</p>
          </div>
        </div>
        <p>
        {courseBio}
        </p>
        <button>
          <div className="Register-button">Enroll Now</div>
        </button>
      </div>
      <div className="Course-image-container">
        <img src={`${BASE_URL}${courseCover}`} className="Course-image" alt="Course logo" />
      </div>
    </div>
  );
}

export default CourseDetailCard;
