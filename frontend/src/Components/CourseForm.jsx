import React, { useState, useContext } from "react";
import {useNavigate} from "react-router-dom";
import "./css/CourseForm.css";
import { Input, Button } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import AuthContext from "../context/AuthContext";

function CourseForm() {
  
  const { authTokens } = useContext(AuthContext);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCover, setCourseCover] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", courseTitle);
    formData.append("description", courseDescription);
    formData.append("cover_photo", courseCover);
    console.log("Request Data:", Object.fromEntries(formData));

    try {
      const token = authTokens.access;
      const response = await fetch(
        "http://localhost:8000/mentor/courses/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const courseId = data.id; 

        navigate(`/mentor-upload/${courseId}`);
      } else {
        console.error("Failed to save course:", response.statusText);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="Course-form">
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-8 mt-8">
          <Input
            type="text"
            label="Course Title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </div>
        <div className="w-full mb-10">
          <Textarea
            label="Course Description"
            minRows={10}
            maxRows={16}
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
          />
        </div>
        <div className="wid w-full mb-4">
          <Input
            type="file"
            label="Course Cover"
            labelPlacement="outside"
            placeholder=" "
            size="md"
            onChange={(e) => setCourseCover(e.target.files[0])}
          />
        </div>
        <div className="flex justify-end ">
          <Button
            type="submit"
            color="default"
            className="py-5 px-10 rounded-lg bg-black text-white"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CourseForm;