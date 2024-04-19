import React, { useState, useEffect, useContext } from "react";
import "./css/MyCourseCard.css";
import {Progress} from "@nextui-org/react";
import { Link } from 'react-router-dom';
import axios from "axios";
import AuthContext from "../context/AuthContext";


function MyCourseCard({courseId,courseCover,courseName,courseOwner}) {
  const [courseProgress, setCourseProgress] = useState(0);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/student/course-progress/${courseId}/`,
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        setCourseProgress(response.data.course_progress);
      } catch (error) {
        console.error("Error fetching course progress:", error);
      }
    };

    fetchCourseProgress();
  }, [courseId, authTokens]);
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