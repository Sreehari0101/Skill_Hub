import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseDetailCard from "../../Components/CourseDetailCard";
import TitleCard from "../../Components/TitleCard";
import ProfileCard from "../../Components/ProfileCard";
import "./css/CourseDetails.css";
import profile_icon from "../../assets/Profile_icon.jpg";
import CourseOverviewCard from "../../Components/CourseOverviewCard";
import CourseContent from "../../Components/CourseContent";
import RatingCard from "../../Components/RatingCard";

function CourseDetails() {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/mentor/chapters-list/${courseId}/`
        );
        console.log(response.data)
        setCourseDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course details:", error);
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return (
    <div className="Course-details">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="Course Details" />
        </div>

        <div className="profile-content">
          <ProfileCard userName="Richu Das" userIcon={profile_icon} />
        </div>
      </div>
      {!loading && courseDetails && (
        <div className="Content-bottom">
          <CourseDetailCard
            courseCover={courseDetails.course.cover_photo}
            courseName={courseDetails.course.title}
            courseOwner={courseDetails.course.mentor}
            courseRating={4.5}
            courseMembers="10K" 
            courseBio={courseDetails.course.description}
          />
          <CourseOverviewCard />

          <CourseContent chapters={courseDetails.chapters} />

          <RatingCard />
        </div>
      )}
    </div>
  );
}

export default CourseDetails;
