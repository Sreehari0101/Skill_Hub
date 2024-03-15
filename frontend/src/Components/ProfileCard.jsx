import React, { useContext, useEffect, useState } from "react";
import profile_icon from "../assets/HR_Profile_Photo.jpg";
import AuthContext from "../context/AuthContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import "./css/Profilecard.css";
import { Input, Avatar} from "@nextui-org/react";
import { CameraIcon } from "./CameraIcon";

function ProfileCard() {
  const { user } = useContext(AuthContext);
  const [userFullname, setUserFullname] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');


  useEffect(() => {
    if (user) {
      setUserName(user.username);
      setUserFullname(user.full_name);
      setUserEmail(user.email);

    }
  }, [user]);

  return (
    <div className="profile-card">
      <Popover showArrow placement="bottom">
        <PopoverTrigger>
          <button className="button">
            <div className="profile-button-content">
              <div className="profile-user-name">{userFullname}</div>
              <div className="profile-icon-container">
                <img className="profile-icon" src={profile_icon} alt="Icon" />
              </div>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] h-[450px] ">
          <Avatar
            src={profile_icon}
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
            <Input type="text" label="Full Name" placeholder= {userFullname} size="md" className="mb-5" />
            <Input type="text" label="Username" size="md" placeholder= {userName} className="mb-5" />
            <Input
              type="text"
              label="Email"
              size="md"
              className="mb-5"
              placeholder= {userEmail}
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
