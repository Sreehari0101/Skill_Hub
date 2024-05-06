import React from "react";
import "./css/Home.css";
import { Link, useNavigate } from "react-router-dom";
import homeImage from "../assets/Home_Image.jpg";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import logo1 from "../assets/SkillHub_Sidebar_logo.png";
import Starfield from "../Components/Starfield";

function Home() {
  const navigate = useNavigate();
  const handleDropdownAction = (key) => {
    switch (key) {
      case "student":
        navigate("/student-dashboard");
        break;
      case "mentor":
        navigate("/mentor-dashboard");
        break;
      case "recruiter":
        navigate("/recruiter-dashboard");
        break;
      default:
        break;
    }
  };
  return (
    <div className="landing-page">
      <Starfield />

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
                  color: "#E5E4E2",
                  backgroundColor: "#113ca5",
                  fontFamily: "Montserrat",
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  borderRadius: "50px",
                }}
              >
                Sign In
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              onAction={(key) => handleDropdownAction(key)}
            >
              <DropdownItem key="student">Student</DropdownItem>
              <DropdownItem key="mentor">Mentor</DropdownItem>
              <DropdownItem key="recruiter">Recruiter</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="bottom">
        <div className="Home-content-container">
          <div className="Home-content">
            <h1 className="Home-heading">Elevate Your Potential</h1>
            <h1 className="Home-heading">
              With <span style={{ color: "#113ca5" }}>Skill Hub</span>
            </h1>
            <h4 className="Home-description">
              Dive into SkillHub, the dynamic platform where innovative learning
              methodologies and interactive content merge to cultivate a rich
              and immersive educational journey!
            </h4>
            <button>
              <div className="button-container">
                <div className="Register-button">Register</div>
                <div className="LearnMore-button">Learn More</div>
              </div>
            </button>
          </div>
        </div>

        <div className="Home-image-container">
          <img className="Home-image" src={homeImage} alt="home" />
        </div>
      </div>
    </div>
  );
}

export default Home;
