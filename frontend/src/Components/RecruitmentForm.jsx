import React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

function RecruitmentForm() {
  return (
    <div className="Recruitment-Form wid w-3/4">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-12 mb-8">
        <Input type="text" label="Full Name" />
        <Input type="tel" label="Contact number" />
      </div>
      <div className="w-full mb-8">
        <Input type="email" label="Email Address" />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-12 mb-8">
        <Input type="text" label="Country" />
        <Input type="text" label="State" />
      </div>
      <div className="w-full mb-8">
        <Input type="text" label="Address" />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-12 mb-8">
        <Input
          type="file"
          label="Resume/CV"
          labelPlacement="outside"
          placeholder=" "
        />
        <Input
          type="file"
          label="Skill Hub Certificate"
          labelPlacement="outside"
          placeholder=" "
        />
      </div>
      <div className="flex justify-end ">
        <Button color="default" className="py-5 px-10 rounded-lg bg-black text-white">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default RecruitmentForm;
