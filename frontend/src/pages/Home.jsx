import React from "react";
import "./css/Home.css";
import { Link } from "react-router-dom";
import homeImage from "../assets/Home_Image.png";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import logo1 from "../assets/SkillHub_Homepage_logo.png";

function Home() {
  return (
    <div className="landing-page">
      <div className="top">
        <div className="logo-container">
          <img src={logo1} className="logo-image" alt="SkillHub-logo" />
          <div class="logo-description">EMPOWERING FUTURES</div>
        </div>

        <div className="nav-bar">
          <Link to="/">
            {" "}
            <div className="nav-items"> Home </div>{" "}
          </Link>
          <Link to="/">
            {" "}
            <div className="nav-items"> About Us </div>{" "}
          </Link>
          <Link to="/">
            {" "}
            <div className="nav-items"> Contact Us </div>{" "}
          </Link>
        </div>
        <div className="dropdown-section">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="p-7 rounded-3xl"
                variant="flat"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  fontFamily: "Montserrat",
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 600,
                }}
              >
                Sign In
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">Student</DropdownItem>
              <DropdownItem key="copy">Mentor</DropdownItem>
              <DropdownItem key="edit">Recruiter</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="bottom">
        <div className="Home-content">
          <h1 className="Home-heading">Elevate Your Potential</h1>
          <h1 className="Home-heading">With SkillHub</h1>
          <h4 className="Home-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            sodales mi non arcu vulputate, eu consectetur ligula semper.
            Vestibulum id ipsum convallis, euismod risus quis, posuere sapien.
          </h4>
          <button>
            <div className="button-container">
              <div className="Register-button">Register</div>
              <div className="LearnMore-button">Learn More</div>
            </div>
          </button>
        </div>
        <div className="Home-image-container">
          <img className="Home-image" src={homeImage} alt="home" />
        </div>
      </div>
    </div>
  );
}

export default Home;
