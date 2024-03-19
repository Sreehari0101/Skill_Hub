import React, { useState, useEffect, useContext } from "react";
import "./css/RecruiterDashboard.css";
import { BiSearch } from "react-icons/bi";
import ProfileCard from "../../Components/ProfileCard";
import WelcomeBox from "../../Components/WelcomeBox";
import { Input } from "@nextui-org/react";
import TitleCard from "../../Components/TitleCard";
import welcomeImage from "../../assets/Dashboard_Welcome.png";
import dashboardImage from "../../assets/Dashboard_Image.png";
import MyRecruitmentsCard from "../../Components/MyRecruitmentsCard";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

function RecruiterDashboard() {
  const { authTokens } = useContext(AuthContext);
  const [recruitments, setRecruitments] = useState([]);
  const swal = require("sweetalert2");

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/recruiter/jobs/",
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );

        const updatedRecruitments = await Promise.all(
          response.data.map(async (recruitment) => {
            const companyProfileResponse = await axios.get(
              `http://localhost:8000/recruiter/company_profiles/${recruitment.company_profile}/`
            );
            return {
              ...recruitment,
              company_profile: companyProfileResponse.data,
            };
          })
        );

        setRecruitments(updatedRecruitments);
      } catch (error) {
        console.error("Error fetching recruitments:", error);
      }
    };

    fetchRecruitments();
  }, [authTokens.access]);

  const handleDelete = async (deletedJobId) => {
    try {
      await axios.delete(
        `http://localhost:8000/recruiter/jobs/${deletedJobId}/`,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      setRecruitments((prevRecruitments) =>
        prevRecruitments.filter(
          (recruitment) => recruitment.id !== deletedJobId
        )
      );

      swal.fire({
        title: "Deleted Successfully",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error deleting job posting:", error);
    }
  };

  return (
    <div className="recruiter-dashboard">
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
          <TitleCard titleName="My Recruitments" />
        </div>
        <div className="myrecruitments-list">
          {recruitments.map((recruitment) => (
            <MyRecruitmentsCard
              key={recruitment.id}
              jobId={recruitment.id}
              onDelete={handleDelete}
              companyIcon={recruitment.company_profile.logo}
              recruitmentDate={recruitment.last_date_of_application}
              companyName={recruitment.company_profile.name}
              jobPosition={recruitment.title}
              jobfeature1={recruitment.job_type}
              jobfeature2={recruitment.work_place}
              jobfeature3={recruitment.salary_package}
              jobDescription={recruitment.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
