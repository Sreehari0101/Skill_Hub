import React, { useState, useRef, useContext } from "react";
import "./css/RecruiterProfile.css";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { CameraIcon } from "../../Components/CameraIcon";
import companyIcon from "../../assets/Netflix_logo.jpg";
import AuthContext from "../../context/AuthContext";

function RecruiterProfile() {
  const { authTokens } = useContext(AuthContext);
  const [logoFile, setLogoFile] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  const fileInputRef = useRef(null);

  const handleLogoChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setLogoFile(selectedFile);
    }
  };

  const handleUpdateLogoClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveClick = async () => {
    if (authTokens) {
      const token = authTokens.access;
      const formData = new FormData();
      if (logoFile) {
        formData.append("logo", logoFile);
      }
      formData.append("name", companyName); 
      formData.append("description", companyDescription);
      formData.append("website", companyWebsite);
      formData.append("email", companyEmail);
  
      console.log("Request Data:", Object.fromEntries(formData));
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      try {
        const response = await fetch("http://localhost:8000/recruiter/company-profile/", requestOptions);

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
    <div className="recruiter-profile">
      <input
        type="file"
        accept="image/*"
        onChange={handleLogoChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      <Avatar
        src={logoFile ? URL.createObjectURL(logoFile) : companyIcon}
        size="sm"
        className="w-40 h-40 text-large mx-auto mb-3"
      />

      <Button
        className="bg-black text-white"
        endContent={<CameraIcon />}
        onClick={handleUpdateLogoClick}
      >
        Update Logo
      </Button>

      <div className="w-5/6 mb-8 mt-8">
        <Input
          type="text"
          label="Company Name"
          className="mb-5"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <Textarea
          label="Company Description"
          minRows={6}
          maxRows={16}
          className="mb-5"
          value={companyDescription}
          onChange={(e) => setCompanyDescription(e.target.value)}
        />
        <Input
          type="text"
          label="Company Website"
          className="mb-5"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />
        <Input
          type="text"
          label="Company Email"
          className="mb-5"
          value={companyEmail}
          onChange={(e) => setCompanyEmail(e.target.value)}
        />

        <div className="flex justify-end">
          <Button
            className="py-5 px-10 rounded-lg bg-black text-white"
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecruiterProfile;
