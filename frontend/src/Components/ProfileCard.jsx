import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import "./css/Profilecard.css";
import { Input, Avatar} from "@nextui-org/react";
import { CameraIcon } from "./CameraIcon";

function ProfileCard({ userName, userIcon }) {
  return (
    <div className="profile-card">
      <Popover showArrow placement="bottom">
        <PopoverTrigger>
          <button className="button">
            <div className="profile-button-content">
              <div className="profile-user-name">{userName}</div>
              <div className="profile-icon-container">
                <img className="profile-icon" src={userIcon} alt="Icon" />
              </div>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] h-[450px] ">
          <Avatar
            src={userIcon}
            size="sm"
            className="w-20 h-20 text-large mx-auto mb-2"
          />
          <Button
            className=" bg-black text-white"
            size="sm"
            endContent={<CameraIcon />}
          >
            Update Photo
          </Button>
          <div className=" m-3 w-5/6 ">
            <Input type="text" label="Full Name" placeholder= {userName} size="md" className="mb-5" />
            <Input type="text" label="Username" size="md" className="mb-5" />
            <Input
              type="text"
              label="Email"
              size="md"
              className="mb-5"
            />
            <div className="flex justify-end ">
              <Button size ="sm" className="rounded-lg bg-black text-white">Save</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ProfileCard;
