import React from "react";
import "./css/CourseOverviewCard.css";
import Video_Lecture_Image from "./../assets/Video_Lecture_Image.png";
import Notes_Image from "./../assets/Notes_Image.png";
import Certificate_Image from "./../assets/Certificate_Image.png";

function CourseOverviewCard() {
  return (
    <div className="Course-overview">
      <h1>What’s Included</h1>
      <div className="Course-overview-contents">
        <div className="video-lecture-image-container">
          <img className="rating-icon" src={Video_Lecture_Image} alt="Icon" />
          <h2>Video Lectures</h2>
        </div>
        <div className="notes-image-container">
          <img className="rating-icon" src={Notes_Image} alt="Icon" />
          <h2>Notes</h2>
        </div>
        <div className="certificate-image-container">
          <img className="rating-icon" src={Certificate_Image} alt="Icon" />
          <h2>Certificate of Completion</h2>
        </div>
      </div>
    </div>
  );
}

export default CourseOverviewCard;
