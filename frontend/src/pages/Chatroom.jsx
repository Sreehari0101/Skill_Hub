import React from "react";
import Sidebar from "../Components/Sidebar";
import "./css/Chatroom.css";
import Chatcard from "../Components/Chatcard";
import Cover1 from "./../assets/Webdevelopment_Chatroom_image.avif";
import TitleCard from "../Components/TitleCard";
import ProfileCard from "../Components/ProfileCard";

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
          <ProfileCard />
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
            imageSrc={Cover1}
            altText="Web Development cover"
            chatroomName="Web Development"
            chatroomDescription="Join the Web development Chatroom by Dr Lizz Truss."
            studentsJoined={15}
          />

          <Chatcard
            imageSrc={Cover1}
            altText="Web Development cover"
            chatroomName="Web Development"
            chatroomDescription="Join the Web development Chatroom by Dr Lizz Truss."
            studentsJoined={15}
          />

          <Chatcard
            imageSrc={Cover1}
            altText="Web Development cover"
            chatroomName="Web Development"
            chatroomDescription="Join the Web development Chatroom by Dr Lizz Truss."
            studentsJoined={15}
          />

          <Chatcard
            imageSrc={Cover1}
            altText="Web Development cover"
            chatroomName="Web Development"
            chatroomDescription="Join the Web development Chatroom by Dr Lizz Truss."
            studentsJoined={15}
          />

          <Chatcard
            imageSrc={Cover1}
            altText="Web Development cover"
            chatroomName="Web Development"
            chatroomDescription="Join the Web development Chatroom by Dr Lizz Truss."
            studentsJoined={15}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatroom;
