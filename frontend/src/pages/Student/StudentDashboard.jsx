import React from "react";
import "./css/StudentDashboard.css";
import { BiSearch } from "react-icons/bi";
import ProfileCard from "../../Components/ProfileCard";
import profile_icon from "../../assets/Profile_icon.jpg";
import { Input } from "@nextui-org/react";

function StudentDashboard() {
  return (
    <div class="student-dashboard">
      <div className="Content-top">
        <div className="title-content">
          <Input
            placeholder="Search"
            startContent={<BiSearch />}
            className="rounded-full"
          />
        </div>

        <div className="profile-content">
          <ProfileCard userName="Richu Das" userIcon={profile_icon} />
        </div>
      </div>

      <div className="Content-bottom"></div>
    </div>
  );
}

export default StudentDashboard;
