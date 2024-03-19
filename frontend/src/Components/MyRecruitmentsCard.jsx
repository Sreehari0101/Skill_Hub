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
  jobId,
  onDelete,
}) {
  const BASE_URL = "http://localhost:8000";
  const handleDelete = async () => {
    onDelete(jobId);
  };

  return (
    <div className="MyRecruitment-card">
      <div className="top">
        <div className="Company-logo-container">
          <img
            className="Company-icon"
            src={`${BASE_URL}${companyIcon}`}
            alt="Icon"
          />
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
          <Link to="/recruiter-recruitments-view">
            <button className="view-button">View</button>
          </Link>
        </div>
        <div className="delete-container">
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyRecruitmentsCard;
