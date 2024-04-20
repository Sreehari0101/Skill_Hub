import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import AuthContext from "../context/AuthContext";

function JobForm() {
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState(new Set([]))
  const [workPlace, setWorkPlace] = useState(new Set([]));
  const [roundDetails, setRoundDetails] = useState("");
  const [salaryPackage, setSalaryPackage] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const swal = require("sweetalert2");

  const handleSaveClick = async () => {
    if (authTokens) {
      const selectedJobType = Array.from(jobType)[0];
      const selectedWorkPlace = Array.from(workPlace)[0];
      const token = authTokens.access;
      const formData = new FormData();
      formData.append("title", jobTitle);
      formData.append("description", jobDescription);
      formData.append("job_type", selectedJobType);
      formData.append("work_place", selectedWorkPlace);
      formData.append("round_details", roundDetails);
      formData.append("salary_package", salaryPackage);
      formData.append("last_date_of_application", applicationDate);

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
          "http://localhost:8000/recruiter/jobs/",
          requestOptions
        );

        if (response.ok) {
          swal.fire({
            title: "Successfully created",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });


          navigate("/recruiter-dashboard");
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
    <div className="Job-form wid w-3/4 mb-4">
      <div className=" w-full mb-8 mt-8">
        <Input
          type="text"
          label="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>
      <div className="w-full ">
        <Textarea
          label="Job Description"
          minRows={10}
          maxRows={16}
          className="mb-8"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <div className="flex w-full flex-wrap md:flex-nowrap justify-between mb-8">
          <Select
            label="Job Type"
            className="max-w-xs"
            selectedKeys={jobType}
            onSelectionChange={setJobType}
          >
            <SelectItem value="Full-time" key="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time" key="Part-time">Part-time</SelectItem>
          </Select>
          <Select
            label="Work place"
            className="max-w-xs"
            selectedKeys={workPlace}
            onSelectionChange={setWorkPlace}
          >
            <SelectItem value="Remote" key="Remote">Remote</SelectItem>
            <SelectItem value="On-Site" key="On-Site">On-Site</SelectItem>
          </Select>
        </div>

        <Textarea
          label="Round Details"
          minRows={10}
          maxRows={16}
          className="mb-8"
          value={roundDetails}
          onChange={(e) => setRoundDetails(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-wrap md:flex-nowrap justify-between mb-8">
        <Input
          type="text"
          label="Salary Package"
          className="w-2/5"
          value={salaryPackage}
          onChange={(e) => setSalaryPackage(e.target.value)}
        />
        <Input
          type="text"
          label="Last Date of Application"
          className="w-2/5"
          placeholder="DD-MM-YYYY"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
        />
      </div>

      <div className="flex justify-end ">
        <Button
          color="default"
          className="py-5 px-10 rounded-lg bg-black text-white"
          onClick={handleSaveClick}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default JobForm;
