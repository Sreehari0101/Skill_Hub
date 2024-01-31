import React from "react";
import YouTube from "react-youtube";
import "./css/CourseContent.css";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

function CourseContent() {
  const [selected, setSelected] = React.useState("videos");
  const chapters = [
    "Introduction to Data Analysis",
    "Foundations of Statistics",
    "Data Cleaning and Preprocessing",
    "Data Visualization Techniques",
    "Exploratory Data Analysis (EDA)",
    "Statistical Modeling and Inference",
    "Machine Learning Fundamentals",
    "Advanced Data Analysis Techniques",
    "Big Data Analytics",
    "Capstone Project and Real-world Applications",
  ];
  const VideoPlayer = ({ videoId }) => (
    <YouTube
      videoId={videoId}
      opts={{
        height: "250",
        width: "400",
        playerVars: {
          autoplay: 0,
        },
      }}
    />
  );
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
                  {chapters.map((title, index) => (
                    <AccordionItem
                      key={index.toString()}
                      aria-label={`Accordion ${index + 1}`}
                      title={`Chapter ${index + 1} : ${title}`}
                    >
                      <VideoPlayer videoId="yZvFH7B6gKI" />
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
                  {chapters.map((title, index) => (
                    <AccordionItem
                      key={index.toString()}
                      aria-label={`Accordion ${index + 1}`}
                      title={`Chapter ${index + 1} : ${title}`}
                    >
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur.
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="cerificate"
            title="Certificate"
            className="p-5 font-montserrat text-2xl font-medium"
          >
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default CourseContent;
