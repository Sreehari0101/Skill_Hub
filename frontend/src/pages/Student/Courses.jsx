import React from "react";
import "./css/Courses.css";
import { BiSearch } from "react-icons/bi";
import TitleCard from "../../Components/TitleCard";
import ProfileCard from "../../Components/ProfileCard";
import profile_icon from "../../assets/Profile_icon.jpg";
import Cover1 from "../../assets/Data_Analytics_Course_icon.jpg";
import Cover2 from "../../assets/Crypto_Currency_Course_icon.png";
import Cover3 from "../../assets/Artificial_Intelligence_Course_icon.webp";
import Cover4 from "../../assets/Game_Development_Course_icon.jpg";
import Cover5 from "../../assets/Digital_Marketing_Course_icon.jpg";
import Cover6 from "../../assets/Cloud_Computing_Course_icon.avif";

import { Input } from "@nextui-org/react";

import CourseCard from "../../Components/CourseCard";

function Courses() {
  return (
    <div class="Courses">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="All Courses" />
        </div>

        <div className="profile-content">
          <ProfileCard userName="Richu Das" userIcon={profile_icon} />
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
          <CourseCard
            courseCover={Cover1}
            courseName="The Data Analyst Course: Complete Data Analyst Bootcamp"
            courseOwner="Sundas Khalid"
            courseRating={4.5}
            courseMembers="10K"
          />
          <CourseCard
            courseCover={Cover2}
            courseName="Cryptocurrency Investment Course 2023: Fund your Retirement!"
            courseOwner="Satashi Nakomoto"
            courseRating={4.4}
            courseMembers="8K"
          />
          <CourseCard
            courseCover={Cover3}
            courseName="The Complete Artificial Intelligence (AI) for Professionals"
            courseOwner="Ryan G. Sling"
            courseRating={4.3}
            courseMembers="12K"
          />
          <CourseCard
            courseCover={Cover4}
            courseName="The Ultimate Guide to Game Development with Unity (Official)"
            courseOwner="Sundas Khalid"
            courseRating={4.2}
            courseMembers="10K"
          />
          <CourseCard
            courseCover={Cover5}
            courseName="Digital Marketing & Performance Marketing fundamental course"
            courseOwner="Jade Raymond"
            courseRating={3.9}
            courseMembers="6K"
          />
          <CourseCard
            courseCover={Cover6}
            courseName="Introduction to Cloud Computing with AWS, Azure and GCP"
            courseOwner="Dr Deepa Khosla"
            courseRating={3.8}
            courseMembers="13K"
          />
        </div>
      </div>
    </div>
  );
}

export default Courses;
