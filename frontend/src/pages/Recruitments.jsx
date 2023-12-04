import React from "react";
import "./css/Recruitments.css";
import Sidebar from "../Components/Sidebar";
import TitleCard from "../Components/TitleCard";
import ProfileCard from "../Components/ProfileCard";
import profile_icon from "./../assets/Profile_icon.jpg";
import RecruitmentCard from "../Components/RecruitmentCard";
import companyIcon1 from "./../assets/Meta_logo.jpg";
import companyIcon2 from "./../assets/Spotify_logo.png";
import companyIcon3 from "./../assets/Google_logo.jpg";
import companyIcon4 from "./../assets/Netflix_logo.jpg";

function Recruitments() {
  return (
    <div className="Recruitments">
      <div class="Sidebar">
        <Sidebar />
      </div>
      <div className="Content">
        <div className="Content-top">
          <div className="title-content">
            <TitleCard titleName="Recruitments" />
          </div>

          <div className="profile-content">
            <ProfileCard userName="Richu Das" userIcon={profile_icon} />
          </div>
        </div>
        <div className="Content-bottom">
          <RecruitmentCard
            companyIcon={companyIcon1}
            recruitmentDate="18 November 2023"
            companyName="Meta"
            jobPosition="Software Tester"
            jobfeature1="Full-time"
            jobfeature2="Remote"
            jobfeature3=" 7 LPA"
            jobDescription="Meta is seeking a highly motivated and detail-oriented Software Tester to join our dynamic team. The successful candidate will be responsible for ensuring the quality and functionality of our software products through systematic testing processes"
          />

          <RecruitmentCard
            companyIcon={companyIcon2}
            recruitmentDate="04 December 2023"
            companyName="Spotify"
            jobPosition="Software Developer"
            jobfeature1="Full-time"
            jobfeature2="On-site"
            jobfeature3=" 8 LPA"
            jobDescription="Spotify is seeking a highly skilled and innovative Software Developer to join our dynamic team. The successful candidate will play a key role in designing, implementing, testing, and maintaining software solutions"
          />

          <RecruitmentCard
            companyIcon={companyIcon3}
            recruitmentDate="01 October 2023"
            companyName="Google"
            jobPosition="UI/UX Designer"
            jobfeature1="Part-time"
            jobfeature2="Remote"
            jobfeature3=" 7 LPA"
            jobDescription="Alphabet Google is looking for a talented UI/UX Designer to join Google's innovative design team. The ideal candidate will be responsible for creating visually stunning and user-centric designs for various digital platforms."
          />
          <RecruitmentCard
            companyIcon={companyIcon4}
            recruitmentDate="18 February 2023"
            companyName="Netflix"
            jobPosition="Project Manager"
            jobfeature1="Full-time"
            jobfeature2="Remote"
            jobfeature3=" 5 LPA"
            jobDescription="Netflix is seeking a dynamic and experienced Project Manager to join it's innovative project management team. The successful candidate will play a crucial role in planning, executing, and delivering strategic initiatives"
          />
        </div>
      </div>
    </div>
  );
}

export default Recruitments;
