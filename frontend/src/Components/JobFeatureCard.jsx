import React from "react";
import "./css/JobFeatureCard.css";

function JobFeatureCard({ feature }) {
  return (
    <div className="Job-feature-card">
      <h1>{feature}</h1>
    </div>
  );
}

export default JobFeatureCard;
