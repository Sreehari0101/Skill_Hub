import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

function RecruitmentForm({ jobId }) {
  const { authTokens } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);

  const handleSubmitClick = async () => {
    if (authTokens) {
      const token = authTokens.access;
      const formData = new FormData();
      formData.append("job", jobId);
      formData.append("full_name", fullName);
      formData.append("contact_number", contactNumber);
      formData.append("email", emailAddress);
      formData.append("country", country);
      formData.append("state", state);
      formData.append("address", address);
      formData.append("resume_cv", resumeFile);
      formData.append("skill_hub_certificate", certificateFile);

      console.log("Request Data:", Object.fromEntries(formData));
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      try {
        const response = await fetch(
          "http://localhost:8000/recruiter/job-applications/",
          requestOptions
        );

        if (response.ok) {
          console.log("Data saved successfully!");
        } else {
          console.error("Error saving data:", response.statusText);
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
  return (
    <div className="Recruitment-Form wid w-3/4">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-12 mb-8">
        <Input
          type="text"
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          type="tel"
          label="Contact number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>
      <div className="w-full mb-8">
        <Input
          type="email"
          label="Email Address"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-12 mb-8">
        <Input
          type="text"
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Input
          type="text"
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div className="w-full mb-8">
        <Input
          type="text"
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-12 mb-8">
        <Input
          type="file"
          label="Resume/CV"
          labelPlacement="outside"
          placeholder=" "
          onChange={(e) => setResumeFile(e.target.files[0])}
        />
        <Input
          type="file"
          label="Skill Hub Certificate"
          labelPlacement="outside"
          placeholder=" "
          onChange={(e) => setCertificateFile(e.target.files[0])}
        />
      </div>
      <div className="flex justify-end ">
        <Button
          color="default"
          className="py-5 px-10 rounded-lg bg-black text-white"
          onClick={handleSubmitClick}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default RecruitmentForm;
