import React from "react";
import Sidebar from "../Components/Sidebar";
import "./css/Chatroom.css";
import Chatcard from "../Components/Chatcard";
import Cover1 from "./../assets/Webdevelopment_Chatroom_image.avif";
import Cover2 from "./../assets/Digital_marketing_Chatroom_image.avif";
import Cover3 from "./../assets/Deeplearning_Chatroom_image.jpg";
import Cover4 from "./../assets/Robotics_Chatroom_image.avif";
import Cover5 from "./../assets/Data_analytics_Chatroom_image.avif";
import Cover6 from "./../assets/Crypto_currency_Chatroom_image.jpg";

import TitleCard from "../Components/TitleCard";
import ProfileCard from "../Components/ProfileCard";
import profile_icon from "./../assets/Profile_icon.jpg";

function Chatroom() {
  return (
    <div class="Chatroom">
      <div class="Sidebar">
        <Sidebar />
      </div>

      <div className="Content">
        <div className="Content-top">
          <div className="title-content">
            <TitleCard titleName="Chat Rooms" />
          </div>

          <div className="profile-content">
            <ProfileCard userName="Richu Das" userIcon={profile_icon} />
          </div>
        </div>
        <div className="Content-bottom">
          <Chatcard
            imageSrc={Cover1}
            altText="Web Development cover"
            chatroomName="Web Development"
            chatroomDescription="Join the Web development Chatroom by Dr Lizz Truss."
            studentsJoined={15}
          />

          <Chatcard
            imageSrc={Cover2}
            altText="Digital Marketing cover"
            chatroomName="Digital Marketing"
            chatroomDescription="Join the Digital Marketing Chatroom by Gary Vee."
            studentsJoined={9}
          />

          <Chatcard
            imageSrc={Cover3}
            altText="Deep Learning cover"
            chatroomName="Deep Learning"
            chatroomDescription="Join the Deep Learning Chatroom by Dr Deepa Khosla."
            studentsJoined={20}
          />

          <Chatcard
            imageSrc={Cover4}
            altText="Robotics cover"
            chatroomName="Robotics "
            chatroomDescription="Join the Robotics & Automation  Chatroom by Takeo Kanade."
            studentsJoined={25}
          />

          <Chatcard
            imageSrc={Cover5}
            altText="Data Analytics cover"
            chatroomName="Data Analytics"
            chatroomDescription="Join the Data Analytics Chatroom by Sundas Kahalid."
            studentsJoined={15}
          />

          <Chatcard
            imageSrc={Cover6}
            altText="Crypto Currency cover"
            chatroomName="Crypto Currency"
            chatroomDescription="Join the Crypto Currency Chatroom by Satashi Nakomoto."
            studentsJoined={30}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
