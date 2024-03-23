import { useEffect, useRef, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import "./css/UploadWidget.css";
import Upload_icon from "./../assets/Upload_icon.png";
import Add_more from "./../assets/Add_more.png";
import { useParams } from "react-router-dom";

const UploadWidget = () => {
  const { courseId } = useParams(); // Extract the course ID from the URL
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [chapters, setChapters] = useState([
    { chapterName: "", uploadedUrl: "" },
  ]);

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
          const updatedChapters = [...chapters];
          updatedChapters[updatedChapters.length - 1].uploadedUrl = secure_url;
          setChapters(updatedChapters);
          console.log("Uploaded URL:", secure_url);
        }
      }
    );
  }, [chapters]);

  const handleUploadClick = () => {
    widgetRef.current.open();
  };

  const handleChapterNameChange = (e, index) => {
    const { value } = e.target;
    const updatedChapters = [...chapters];
    updatedChapters[index].chapterName = value;
    setChapters(updatedChapters);
  };

  const handleAddChapter = () => {
    setChapters([...chapters, { chapterName: "", uploadedUrl: "" }]);
  };

  const saveChapters = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/your-backend-chapters-endpoint/${courseId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chapters),
        }
      );
      if (response.ok) {
        console.log("Chapters saved successfully");
      } else {
        console.error("Failed to save chapters:", response.statusText);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div>
      {chapters.map((chapter, index) => (
        <div className="upload-widget" key={index}>
          <div className="w-full mb-10 mt-8">
            <Input
              type="text"
              label="Chapter Name"
              value={chapter.chapterName}
              onChange={(e) => handleChapterNameChange(e, index)}
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
              <div className="upload-video-text">Upload video</div>
            </button>
          </div>
          {chapter.uploadedUrl && (
            <div>
              <video width="350" height="500" controls>
                <source src={chapter.uploadedUrl} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      ))}
      <div className="add-more-container">
        <button className="add-more-button" onClick={handleAddChapter}>
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
          onClick={saveChapters}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UploadWidget;
