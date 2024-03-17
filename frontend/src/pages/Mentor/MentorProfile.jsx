import React, { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./css/MentorProfile.css";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { CameraIcon } from "../../Components/CameraIcon";

function MentorProfile() {
  const { authTokens, user } = useContext(AuthContext);
  const [profileFile, setProfileFile] = useState(null);
  const [profileURL, setProfileURL] = useState("");
  const [userTagline, setUserTagline] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userEducation, setUserEducation] = useState("");
  const [userSubjects, setUserSubjects] = useState("");
  const [userExperience, setUserExperience] = useState("");

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      if (authTokens) {
        const token = authTokens.access;
        const response = await fetch(
          "http://localhost:8000/accounts/mentor-profile/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            console.log(data);
            setUserTagline(data[0].tag_line || "");
            setUserBio(data[0].bio || "");
            setUserEducation(data[0].education || "");
            setUserSubjects(data[0].subjects || "");
            setUserExperience(data[0].experience || "");
            setProfileURL(data[0].profile_photo);
          }
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      }
    };

    fetchCompanyProfile();
  }, [authTokens]);
  const fileInputRef = useRef(null);

  const handleProfileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setProfileFile(selectedFile);
    }
  };

  const handleUpdateProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveClick = async () => {
    if (authTokens) {
      const token = authTokens.access;
      const formData = new FormData();
      if (profileFile !== null) {
        formData.append("profile_photo", profileFile);
      } else {
        formData.append("profile_photo", "");
      }
      formData.append("tag_line", userTagline);
      formData.append("bio", userBio);
      formData.append("education", userEducation);
      formData.append("subjects", userSubjects);
      formData.append("experience", userExperience);

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
          "http://localhost:8000/accounts/mentor-profile/",
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
    <div className="mentor-profile ">
      <input
        type="file"
        accept="image/*"
        onChange={handleProfileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Avatar
        src={profileFile ? URL.createObjectURL(profileFile) : profileURL}
        size="sm"
        className="w-40 h-40 text-large mx-auto mb-3"
      />
      <Button className=" bg-black text-white" endContent={<CameraIcon />} onClick={handleUpdateProfileClick}>
        Update Photo
      </Button>
      <div className=" w-5/6 mb-8 mt-8 gap-5">
        <Input
          type="text"
          label="Full Name"
          className="mb-5"
          placeholder={user.full_name}
          disabled
        />
        <Input
          type="text"
          label="Tag line"
          className="mb-5"
          value={userTagline}
          onChange={(e) => setUserTagline(e.target.value)}
        />
        <Textarea
          label="Bio"
          minRows={6}
          maxRows={16}
          className="mb-5"
          value={userBio}
          onChange={(e) => setUserBio(e.target.value)}
        />
        <Textarea
          label="Education"
          minRows={5}
          maxRows={16}
          className="mb-5"
          value={userEducation}
          onChange={(e) => setUserEducation(e.target.value)}
        />
        <Input
          type="text"
          label="Subjects"
          className="mb-5"
          value={userSubjects}
          onChange={(e) => setUserSubjects(e.target.value)}
        />
        <Textarea
          label="Experience"
          minRows={5}
          maxRows={16}
          className="mb-5"
          value={userExperience}
          onChange={(e) => setUserExperience(e.target.value)}
        />
        <div className="flex justify-end ">
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

export default MentorProfile;
