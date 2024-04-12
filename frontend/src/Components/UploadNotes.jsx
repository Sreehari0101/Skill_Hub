import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@nextui-org/react";
import "./css/UploadWidget.css";
import Upload_icon from "./../assets/Upload_icon.png";
import Add_more from "./../assets/Add_more.png";
import { useParams } from "react-router-dom";

const UploadNotes = () => {
  const { courseId } = useParams(); 
  const navigate = useNavigate();
  const swal = require("sweetalert2");
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [notes, setNotes] = useState([{ title: "", file_url: "" }]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "db56itdcp",
        uploadPreset: "ehbuvb9r",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const { secure_url } = result.info;
          const updatedNotes = [...notes];
          updatedNotes[updatedNotes.length - 1].file_url = secure_url;
          setNotes(updatedNotes);
          console.log("Uploaded URL:", secure_url);
        }
      }
    );
  }, [notes]);

  const handleUploadClick = () => {
    widgetRef.current.open();
  };

  const handleNoteNameChange = (e, index) => {
    const { value } = e.target;
    const updatedNotes = [...notes];
    updatedNotes[index].title = value;
    setNotes(updatedNotes);
  };

  const handleAddNote = () => {
    setNotes([...notes, { title: "", file_url: "" }]);
  };

  const saveNotes = async () => {
    try {
      console.log(notes)
      const response = await fetch(
        `http://localhost:8000/mentor/notes/${courseId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ notes }),
        }
      );
      if (response.ok) {
        console.log("Notes saved successfully");
        navigate("/mentor-dashboard")
        swal.fire({
          title: "Notes added Successfully",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        console.error("Failed to save notes:", response.statusText);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div>
      {notes.map((note, index) => (
        <div className="upload-widget" key={index}>
          <div className="w-full mb-10 mt-8">
            <Input
              type="text"
              label="Chapter Name"
              value={note.title}
              onChange={(e) => handleNoteNameChange(e, index)}
            />
          </div>
          <div className="upload-button-container">
            <button className="upload-button" onClick={handleUploadClick}>
              <div className="icon_container">
                <img
                  className="upload-video-icon"
                  src={Upload_icon}
                  alt="Icon"
                />
              </div>
              <div className="upload-video-text">Upload File</div>
            </button>
          </div>
        </div>
      ))}
      <div className="add-more-container">
        <button className="add-more-button" onClick={handleAddNote}>
          <div className="icon_container">
            <img className="add-more-icon" src={Add_more} alt="Icon" />
          </div>
          <div className="add-more-text">Add more</div>
        </button>
      </div>
      <div className="flex justify-end ">
        <Button
          color="default"
          className="py-5 px-10 rounded-lg bg-black text-white"
          onClick={saveNotes}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UploadNotes;