import React from "react";
import "./css/MyCourseCard.css";
import {Progress} from "@nextui-org/react";
import { Link } from 'react-router-dom';


function MyCourseCard({courseId,courseCover,courseName,courseOwner,courseProgress}) {
  return (
    <div className="MyCourse-card">
     <Link to={`/student-mycourse-details/${courseId}`}>
    <div className="Course-icon-container">
      <img className="Course-icon" src={courseCover} alt="Icon" />
    </div>

    <div className="Course-details">
      <h1>{courseName}</h1>
      <h3>{courseOwner}</h3>
      <div className="progress-box">
      <Progress
      size="md"
      radius="md"
      classNames={{
        base: "max-w-md",
        track: "drop-shadow-md border border-default",
        label: "tracking-wider font-medium text-default-600",
        value: "text-foreground/60",
      }}
      label="Progress"
      value={courseProgress}
      showValueLabel={true}
    />
      </div>
      </div>
      </Link>
    </div>
);
}

export default MyCourseCard