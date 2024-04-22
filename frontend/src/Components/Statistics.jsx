import React, { useState, useEffect, useContext } from "react";
import "./css/Statistics.css";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";

function Statistics({courseId}) {
    const { authTokens } = useContext(AuthContext);
    const [courseProgress, setCourseProgress] = useState(0);
    const [engagementProgress, setEngagementProgress] = useState(0);
    const [verificationProgress, setVerificationProgress] = useState(0);
    useEffect(() => {
        const fetchCourseProgress = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8000/student/course-progress/${courseId}/`,
              {
                headers: {
                  Authorization: `Bearer ${authTokens.access}`,
                },
              }
            );
            setCourseProgress(response.data.course_progress);
          } catch (error) {
            console.error("Error fetching course progress:", error);
          }
        };

        const fetchEngagementProgress = async () => {
            try {
              const response = await axios.get(
                `http://localhost:8000/student/student-progress/${courseId}/`,
                {
                  headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                  },
                }
              );
              setEngagementProgress(response.data.engagement_percentage);
            } catch (error) {
              console.error("Error fetching course progress:", error);
            }
          };
        
          const fetchVerificationProgress = async () => {
            try {
              const response = await axios.get(
                `http://localhost:8000/student/student-verify-progress/${courseId}/`,
                {
                  headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                  },
                }
              );
              console.log(response.data)
              console.log(response.verification_percentage)
              setVerificationProgress(response.data.verification_percentage);
              console.log(verificationProgress)
            } catch (error) {
              console.error("Error fetching course progress:", error);
            }
          };
          fetchVerificationProgress();
        fetchCourseProgress();
        fetchEngagementProgress();
        
      }, [courseId, authTokens, verificationProgress, courseProgress, engagementProgress ]);
  return (
    <div className="statistics">
      <h1>Statistics</h1>
      <div className="Course-statistics-contents">
        <div className="engagement-status">
          <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                value={engagementProgress}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: "border-1 border-white/30",
                  content: "text-white/90 text-small font-semibold",
                }}
                variant="bordered"
              >
                Engagement status
              </Chip>
            </CardFooter>
          </Card>
        </div>
        <div className="progress-status">
          <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                value={courseProgress}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: "border-1 border-white/30",
                  content: "text-white/90 text-small font-semibold",
                }}
                variant="bordered"
              >
                Progress
              </Chip>
            </CardFooter>
          </Card>
        </div>
        <div className="verification-status">
          <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-white",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                value={verificationProgress}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: "border-1 border-white/30",
                  content: "text-white/90 text-small font-semibold",
                }}
                variant="bordered"
              >
                Verification status
              </Chip>
            </CardFooter>
          </Card>
        </div>
        
      </div>
    </div>
  );
}

export default Statistics;
