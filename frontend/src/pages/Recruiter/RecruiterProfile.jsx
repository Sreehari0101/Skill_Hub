import React from "react";
import "./css/RecruiterProfile.css";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { CameraIcon } from "../../Components/CameraIcon";
import companyIcon from "../../assets/Netflix_logo.jpg";

function RecruiterProfile() {
  return (
    <div className="recruiter-profile ">
      <Avatar
        src={companyIcon}
        size="sm"
        className="w-40 h-40 text-large mx-auto mb-3"
      />
      <Button className=" bg-black text-white" endContent={<CameraIcon />}>
        Update Logo
      </Button>
      <div className=" w-5/6 mb-8 mt-8 ">
        <Input type="text" label="Company Name" className="mb-5" />
        <Textarea
          label="Company Description"
          minRows={6}
          maxRows={16}
          className="mb-5"
        />
        <Input type="text" label="Company Website" className="mb-5" />
        <Input type="text" label="Company Email" className="mb-5" />
        <div className="flex justify-end ">
          <Button className="py-5 px-10 rounded-lg bg-black text-white">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecruiterProfile;
