import React, { useState, useEffect, useContext} from "react";
import "./css/StudentDashboard.css";
import { BiSearch } from "react-icons/bi";
import { Input } from "@nextui-org/react";
import ProfileCard from "../../Components/ProfileCard";
import WelcomeBox from "../../Components/WelcomeBox";
import TitleCard from "../../Components/TitleCard";
import MyCourseCard from "../../Components/MyCourseCard";
import welcomeImage from "../../assets/Dashboard_Welcome.png";
import dashboardImage from "../../assets/Dashboard_Image.png";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

function StudentDashboard() {
  const { authTokens } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/mentor/course-enroll-list/",
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        console.log(response.data);
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, [authTokens]);
  return (
    <div class="student-dashboard">
      <div className="Content-top">
        <div className="title-content">
          <Input
           
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
          <WelcomeBox
          welcomeImage = {welcomeImage}
          />
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
        {enrolledCourses.map((course) => (
            <MyCourseCard
              courseId={course.id}
              courseCover={course.cover_photo}
              courseName={course.title}
              courseOwner={course.mentor_full_name}
              courseProgress={course.progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
