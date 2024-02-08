import React from 'react'
import "./css/CourseForm.css";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
function CourseForm() {
  return (
    <div className='Course-form'>
    <div className="wid w-full mb-4">
      <div className=" w-full mb-8 mt-8">
        <Input type="text" label="Course Title" />
      </div>
      <div className="w-full mb-8">
        <Textarea
          label="Course Description"
          minRows={10}
          maxRows={16}
        />
      </div>
    </div>

    
    </div>
  )
}

export default CourseForm