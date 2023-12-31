import React from "react";
import "./css/RecruitmentCard.css";
import JobFeatureCard from "./JobFeatureCard";
import { Link } from 'react-router-dom'

function RecruitmentCard({companyIcon,recruitmentDate,companyName,jobPosition,jobfeature1,jobfeature2,jobfeature3,jobDescription}) {
  return (
    <div className="Recruitment-card">
      <div className="Recruitment-card-top">
        <div className="Company-logo-container">
          <img className="Company-icon" src={companyIcon} alt="Icon" />
        </div>
        <div className="Recruitment-date">{recruitmentDate}</div>
      </div>

      <div className="Recruitment-card-middle">
        <h1>{companyName} - {jobPosition}</h1>
        <div className="Job-features">
          <JobFeatureCard feature={jobfeature1} />
          <JobFeatureCard feature= {jobfeature2} />
          <JobFeatureCard feature= {jobfeature3} />
        </div>
        <p>
         {jobDescription}
        </p>
      </div>

      <div className="Recruitment-card-bottom">
      <Link to="/student-recruitments-apply">
        <button className="Apply-button">
          <div className="Button-content">Apply Now</div>
        </button>
      </Link>
      </div>
    </div>
  );
}

export default RecruitmentCard;
