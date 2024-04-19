import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
import "./css/CourseContent.css";
import { Progress } from "@nextui-org/react";
import { useParams } from "react-router-dom";
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
import Certificate from "./Certificate";

function CourseContent({ courseName, courseOwner, chapters, notes }) {
  
  const componentRef = useRef();
  let { courseId } = useParams();
  const { authTokens } = useContext(AuthContext);
  const [selected, setSelected] = useState("videos");
  const [mediaProgress, setMediaProgress] = useState(0);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [chapterProgress, setChapterProgress] = useState({});


  const updateCourseProgress = useCallback(
    async (courseId, chapterId) => {
      try {
        await axios.post(
          `http://localhost:8000/student/update-course-progress/${courseId}/${chapterId}/`,
          { progress: 100 },
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        console.log("Chapter progress updated");
      } catch (error) {
        console.error("Error updating chapter progress:", error);
      }
    },
    [authTokens.access]
  );

  useEffect(() => {
    const fetchChapterProgress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/student/chapter-progress/${courseId}/`,
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        );
        const progressData = {};
        response.data.forEach((item) => {
          progressData[item.chapter] = item.progress_percentage;
        });
        setChapterProgress(progressData);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching chapter progress:", error);
      }
    };

    fetchChapterProgress();
    const handleProgressUpdate = () => {
      if (mediaProgress >= 100 && currentChapterId !== null) {
        updateCourseProgress(courseId, currentChapterId);
      }
    };

    handleProgressUpdate();
  }, [mediaProgress, courseId, currentChapterId, authTokens.access, updateCourseProgress]);

  const handleProgress = (chapterId, progress) => {
    setCurrentChapterId(chapterId);
    setMediaProgress(progress.played * 100);
  };

  const handleVideoPlay = async () => {
    console.log("Video Started");
    try {
      await axios.post(
        `http://localhost:8000/student/start-tracking/${courseId}/`,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
    } catch (error) {
      console.error("Error starting tracking:", error);
    }
  };

  const handleVideoPause = async () => {
    console.log("Video Ended");
    try {
      await axios.post(
        `http://localhost:8000/student/stop-tracking/${courseId}/`,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
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
          disabledKeys={["certificate"]}
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
                      <Progress
                        size="md"
                        radius="md"
                        classNames={{
                          base: "max-w-full mb-4",
                          track: "drop-shadow-md border border-default",
                          label: "tracking-wider font-medium text-default-600",
                          value: "text-foreground/60",
                        }}
                        label="Progress"
                        value={chapterProgress[chapter.id] || 0}
                        showValueLabel={true}
                      />
                      <ReactPlayer
                        url={chapter.video_url}
                        controls
                        width="100%"
                        height="auto"
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                        onEnded={handleVideoPause}
                        onProgress={(progress) =>
                          handleProgress(chapter.id, progress)
                        }
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
              <CardBody>
                <Certificate
                  courseName={courseName}
                  courseOwner={courseOwner}
                  ref={componentRef}
                />
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => exportComponentAsJPEG(componentRef)}
                >
                  Download Certificate
                </button>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default CourseContent;
