import React, { useState, useEffect, useContext } from "react";
import "./css/MentorDashboard.css";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { BiSearch } from "react-icons/bi";
import ProfileCard from "../../Components/ProfileCard";
import WelcomeBox from "../../Components/WelcomeBox";
import { Input } from "@nextui-org/react";
import TitleCard from "../../Components/TitleCard";
import welcomeImage from "../../assets/Dashboard_Welcome.png";
import dashboardImage from "../../assets/Dashboard_Image.png";
import MentorCourseCard from "../../Components/MentorCourseCard";

function MentorDashboard() {
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
            },
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
    <div class="mentor-dashboard">
      <div className="Content-top">
        <div className="title-content">
          <Input
            variant="bordered"
            placeholder="Type to search...."
            startContent={<BiSearch />}
            className="rounded-full"
          />
        </div>

        <div className="profile-content">
          <ProfileCard />
        </div>
      </div>

      <div className="Content-middle">
        <div className="welcome-box-container">
          <WelcomeBox welcomeImage={welcomeImage} />
        </div>
        <div className="dashboard-image-container">
          <img
            className="dashboard-image"
            src={dashboardImage}
            alt="dashboard"
          />
        </div>
      </div>
      <div className="Content-bottom">
        <div className="mycourses-heading">
          <TitleCard titleName="My Courses" />
        </div>
        <div className="mycourses-list">
          {courses.map((course) => (
            <MentorCourseCard
              courseId={course.id}
              courseCover={course.cover_photo}
              courseName={course.title}
              courseOwner={course.mentor_full_name}
              courseRating={4.5}
              courseMembers="10K"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default MentorDashboard;
