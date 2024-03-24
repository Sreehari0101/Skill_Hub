import React from "react";
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

function CourseContent({ chapters }) {
  const [selected, setSelected] = React.useState("videos");

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
                  {chapters.map((chapter, index) => (
                    <AccordionItem
                      key={index.toString()}
                      aria-label={`Accordion ${index + 1}`}
                      title={`Chapter ${index + 1} : ${chapter.title}`}
                    >
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
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default CourseContent;
