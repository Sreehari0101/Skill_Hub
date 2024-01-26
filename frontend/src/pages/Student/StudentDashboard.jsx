import React from "react";
import "./css/StudentDashboard.css";
import { BiSearch } from "react-icons/bi";
import ProfileCard from "../../Components/ProfileCard";
import WelcomeBox from "../../Components/WelcomeBox";
import profile_icon from "../../assets/Profile_icon.jpg";
import { Input } from "@nextui-org/react";
import TitleCard from "../../Components/TitleCard";
import welcomeImage from "../../assets/Dashboard_Welcome.png";
import dashboardImage from "../../assets/Dashboard_Image.png";
import MyCourseCard from "../../Components/MyCourseCard";
import Cover1 from "../../assets/Data_Analytics_Course_icon.jpg";
import Cover2 from "../../assets/Crypto_Currency_Course_icon.png";
import Cover3 from "../../assets/Artificial_Intelligence_Course_icon.webp";

function StudentDashboard() {
  return (
    <div class="student-dashboard">
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
          <ProfileCard userName="Richu Das" userIcon={profile_icon} />
        </div>
      </div>

      <div className="Content-middle">
        <div className="welcome-box-container">
          <WelcomeBox
          welcomeImage = {welcomeImage}
          date = "January 20, Saturday"
          welcomeText = "Welcome back, Richu Das!"
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
          <MyCourseCard
            courseCover={Cover1}
            courseName="The Data Analyst Course: Complete Data Analyst Bootcamp"
            courseOwner="Sundas Khalid"
            courseProgress={42}
          />

          <MyCourseCard
            courseCover={Cover2}
            courseName="Cryptocurrency Investment Course 2023: Fund your Retirement!"
            courseOwner="Satashi Nakomoto"
            courseProgress={65}
          />

          <MyCourseCard
            courseCover={Cover3}
            courseName="The Complete Artificial Intelligence (AI) for Professionals"
            courseOwner="Jade Raymond"
            courseProgress={80}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
