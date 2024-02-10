import React from 'react';
import "./css/MentorProfile.css";
import {Input} from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Avatar } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { CameraIcon } from '../../Components/CameraIcon';
import profile_icon from "../../assets/Mentor_Profile_photo.jpg";


function MentorProfile() {
  return (
   <div className='mentor-profile '>
    <Avatar src={profile_icon} size='sm' className="w-40 h-40 text-large mx-auto mb-3" />
          <Button className=" bg-black text-white" endContent={<CameraIcon />}>
            Update Photo
          </Button>
    <div className=" w-5/6 mb-8 mt-8 gap-5">
        <Input type="text" label="Full Name" className='mb-5'/>
        <Input type="text" label="Tag line" className='mb-5'/>
        <Textarea
          label="Bio"
          minRows={6}
          maxRows={16}
          className='mb-5'
        />
         <Textarea
          label="Education"
          minRows={5}
          maxRows={16}
          className='mb-5'
        />
        <Input type="text" label="Subjects" className='mb-5'/>
        <Textarea
          label="Experience"
          minRows={5}
          maxRows={16}
          className='mb-5'
        />
        <div className="flex justify-end ">
          <Button className="py-5 px-10 rounded-lg bg-black text-white">
            Save
          </Button>
          </div>
      </div>
   </div>
  )
}

export default MentorProfile