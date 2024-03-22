import React, { useState, useEffect, useContext } from "react";
import TitleCard from "../../Components/TitleCard";
import ProfileCard from "../../Components/ProfileCard";
import AuthContext from "../../context/AuthContext";
import "./css/RecruitmentsView.css";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

function RecruitmentsView() {
  const { authTokens } = useContext(AuthContext);
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = authTokens.access;
        const response = await fetch(
          `http://localhost:8000/recruiter/job-applications/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setApplicants(data);
        } else {
          console.error("Failed to fetch applicants:", response.statusText);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    };

    fetchApplicants();
  }, [jobId, authTokens]);

  return (
    <div className="Recruitments-view">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="Applicants" />
        </div>

        <div className="profile-content">
          <ProfileCard />
        </div>
      </div>
      <div className="Content-bottom ">
        <Table
          removeWrapper
          aria-label="Example static collection table"
          className=" w-5/6"
        >
          <TableHeader>
            <TableColumn>Full Name</TableColumn>
            <TableColumn>Contact number</TableColumn>
            <TableColumn>Email Address</TableColumn>
            <TableColumn>Country</TableColumn>
            <TableColumn>State</TableColumn>
            <TableColumn>Address</TableColumn>
            <TableColumn>Resume/CV</TableColumn>
            <TableColumn>Skill Hub Certificate</TableColumn>
          </TableHeader>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>{applicant.full_name}</TableCell>
                <TableCell>{applicant.contact_number}</TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.country}</TableCell>
                <TableCell>{applicant.state}</TableCell>
                <TableCell>{applicant.address}</TableCell>
                <TableCell>
                  <a
                    href={applicant.resume_cv}
                    target="_blank"
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={applicant.skill_hub_certificate}
                    target="_blank"
                    className="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                    rel="noopener noreferrer"
                  >
                    View Certificate
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default RecruitmentsView;
