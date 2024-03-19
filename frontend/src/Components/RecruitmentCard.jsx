import React from "react";
import "./css/RecruitmentCard.css";
import JobFeatureCard from "./JobFeatureCard";
import { Link } from 'react-router-dom'

function RecruitmentCard({companyIcon,recruitmentDate,companyName,jobPosition,jobfeature1,jobfeature2,jobfeature3,jobDescription}) {
  const BASE_URL = "http://localhost:8000";
  return (
    <div className="Recruitment-card">
      <div className="top">
        <div className="Company-logo-container">
          <img className="Company-icon" src={`${BASE_URL}${companyIcon}`} alt="Icon" />
        </div>
        <div className="Recruitment-date">Deadline : {recruitmentDate}</div>
      </div>

      <div className="middle">
        <h1 className="headings">{companyName} - {jobPosition}</h1>
        <div className="Job-features">
          <JobFeatureCard feature={jobfeature1} />
          <JobFeatureCard feature= {jobfeature2} />
          <JobFeatureCard feature= {jobfeature3} />
        </div>
        <p>
         {jobDescription}
        </p>
      </div>

      <div className="bottom">
      <Link to="/student-recruitments-view">
        <button className="Apply-button">
          <div className="Button1-content">View Details</div>
        </button>
      </Link>


      <Link to="/student-recruitments-apply">
        <button className="Apply-button">
          <div className="Button2-content">Apply Now</div>
        </button>
      </Link>


      </div>
    </div>
  );
}

export default RecruitmentCard;
