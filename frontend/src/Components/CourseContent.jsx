import React, { useState, useContext } from "react";
import "./css/CourseContent.css";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import ReactPlayer from "react-player";
import AuthContext from "../context/AuthContext";
import axios from "axios";

function CourseContent({ chapters, notes }) {
  const { authTokens } = useContext(AuthContext);
  const [selected, setSelected] = useState("videos");

  const handleVideoPlay = async () => {
    try {
      await axios.get("http://localhost:8000/student/start-tracking/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
    } catch (error) {
      console.error("Error starting tracking:", error);
    }
  };

  const handleVideoPause = async () => {
    try {
      await axios.get("http://localhost:8000/student/pause-tracking/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      console.log("Tracking paused");
    } catch (error) {
      console.error("Error pausing tracking:", error);
    }
  };

  const handleVideoEnd = async () => {
    try {
      await axios.get("http://localhost:8000/student/stop-tracking/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      console.log("Tracking stopped");
    } catch (error) {
      console.error("Error stopping tracking:", error);
    }
  };

  return (
    <div className="Course-content">
      <h1>Course Content</h1>
      <div className="flex w-full flex-col py-5 ">
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
          color="secondary"
          className="flex-col w-full"
        >
          <Tab
            key="videos"
            title="Videos"
            className="p-5 font-montserrat text-2xl font-medium"
          >
            <Card>
              <CardBody>
                <Accordion selectionMode="multiple">
                  {chapters.map((chapter, index) => (
                    <AccordionItem
                      key={index.toString()}
                      aria-label={`Accordion ${index + 1}`}
                      title={`Chapter ${index + 1} : ${chapter.title}`}
                    >
                      <ReactPlayer
                        url={chapter.video_url}
                        controls
                        width="100%"
                        height="auto"
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                        onEnded={handleVideoEnd}
                      />
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="notes"
            title="Notes"
            className="p-5 font-montserrat text-2xl font-medium"
          >
            <Card>
              <CardBody>
                <Accordion selectionMode="multiple">
                  {notes.map((note, index) => (
                    <AccordionItem
                      key={index.toString()}
                      aria-label={`Accordion ${index + 1}`}
                      title={`Module ${index + 1} : ${note.title}`}
                    >
                      <a
                        href={note.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {note.title}
                      </a>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="certificate"
            title="Certificate"
            className="p-5 font-montserrat text-2xl font-medium"
          >
            <Card>
              <CardBody></CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default CourseContent;
