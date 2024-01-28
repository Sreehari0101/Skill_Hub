import React from "react";
import "./css/MyRecruitmentCard.css";
import JobFeatureCard from "./JobFeatureCard";
import { Link } from "react-router-dom";

function MyRecruitmentsCard({
  companyIcon,
  recruitmentDate,
  companyName,
  jobPosition,
  jobfeature1,
  jobfeature2,
  jobfeature3,
  jobDescription,
}) {
  return (
    <div className="MyRecruitment-card">
      <div className="top">
        <div className="Company-logo-container">
          <img className="Company-icon" src={companyIcon} alt="Icon" />
        </div>
        <div className="Recruitment-date">{recruitmentDate}</div>
      </div>

      <div className="middle">
        <h1 className="headings">
          {companyName} - {jobPosition}
        </h1>
        <div className="Job-features">
          <JobFeatureCard feature={jobfeature1} />
          <JobFeatureCard feature={jobfeature2} />
          <JobFeatureCard feature={jobfeature3} />
        </div>
        <p>{jobDescription}</p>
      </div>

      <div className="bottom">
        <div className="view-container">
        <Link to="/recruitments-view"><button className="view-button">View</button> </Link>
        </div>
        <div className="delete-container">
        <button className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default MyRecruitmentsCard;
