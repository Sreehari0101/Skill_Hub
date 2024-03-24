import React from "react";
import "./css/CourseCard.css";
import Rating_icon from "./../assets/Rating_star_icon.png";
import { Link } from 'react-router-dom'

function CourseCard({courseId,courseCover,courseName,courseOwner,courseRating,courseMembers}) {
  return (
    <div className="Course-card">
      <Link to={`/student-course-details/${courseId}`}>
      <div className="Course-icon-container">
        <img className="Course-icon" src={courseCover} alt="Icon" />
      </div>

      <div className="Course-details">
        <h1>{courseName}</h1>
        <h3>{courseOwner}</h3>
        <div className="Course-survey">
          <div className="rating-container">
            <img className="rating-icon" src={Rating_icon} alt="Icon" />
          </div>
          <div className="survey-details">
            <p>{courseRating} ({courseMembers})</p>
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
}

export default CourseCard;
