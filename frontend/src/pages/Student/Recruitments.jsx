import React, { useState, useEffect, useContext } from "react";
import "./css/Recruitments.css";
import TitleCard from "../../Components/TitleCard";
import ProfileCard from "../../Components/ProfileCard";
import axios from "axios";
import RecruitmentCard from "../../Components/RecruitmentCard";
import AuthContext from "../../context/AuthContext";

function Recruitments() {
  const { authTokens } = useContext(AuthContext);
  const [recruitments, setRecruitments] = useState([]);

  useEffect(() => {
    const fetchRecruitments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/recruiter/jobs/",
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            }
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
  }, [authTokens]);

  return (
    <div className="Recruitments">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="Recruitments" />
        </div>

        <div className="profile-content">
          <ProfileCard />
        </div>
      </div>
      <div className="Content-bottom">
        {recruitments.map((recruitment) => (
          <RecruitmentCard
            key={recruitment.id}
            jobId={recruitment.id}
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
  );
}

export default Recruitments;
