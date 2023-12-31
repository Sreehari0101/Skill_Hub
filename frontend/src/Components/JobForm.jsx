import React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

function JobForm() {
  return (
    <div className="Job-form wid w-3/4 mb-4">
      <div className=" w-full mb-8 mt-8">
        <Input type="text" label="Job Title" />
      </div>
      <div className="w-full mb-8">
        <Textarea
          label="Job Description"
          placeholder="Enter the Job description and requirements."
          minRows={10}
          maxRows={16}
        />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap justify-between mb-8">
        <Select label="Job Type" className="max-w-xs">
          <SelectItem value="Full-time">Full-time</SelectItem>
          <SelectItem value="Part-time">Part-time</SelectItem>
        </Select>
        <Select label="Work place" className="max-w-xs">
          <SelectItem value="Remote">Remote</SelectItem>
          <SelectItem value="On-Site">On-Site</SelectItem>
        </Select>
      </div>

      <div className="w-full mb-8">
        <Input type="text" label="Salary Package" />
      </div>

      <div className="flex justify-end ">
        <Button
          color="default"
          className="py-5 px-10 rounded-lg bg-black text-white"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default JobForm;
