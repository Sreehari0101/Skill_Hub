import React, { useState, useEffect, useContext } from "react";
import "./css/Courses.css";
import { BiSearch } from "react-icons/bi";
import TitleCard from "../../Components/TitleCard";
import ProfileCard from "../../Components/ProfileCard";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { Input } from "@nextui-org/react";
import CourseCard from "../../Components/CourseCard";

function Courses() {
  const { authTokens } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/mentor/courses-list/",
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            }
          }
        );
      setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
     
    fetchCourses();
  }, [authTokens]);


  return (
    <div class="Courses">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="All Courses" />
        </div>

        <div className="profile-content">
          <ProfileCard userName="Richu Das" />
        </div>
      </div>

      <div className="Content-bottom">
        <div className="course-search">
          <Input
            placeholder="Search"
            startContent={<BiSearch />}
            className="mb-8 rounded-full"
          />
        </div>
        <div className="course-list">
          {courses.map((course) => (
          <CourseCard
            courseId = {course.id}
            courseCover={course.cover_photo}
            courseName= {course.title}
            courseOwner= {course.mentor}
            courseRating={4.5}
            courseMembers="10K"
          />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
