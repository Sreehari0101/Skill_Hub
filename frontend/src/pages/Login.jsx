import React from "react";
import "./css/Login.css";
import { Input } from "@nextui-org/react";
import {EyeFilledIcon} from "../Components/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../Components/EyeSlashFilledIcon";
import loginImage from "../assets/Login_Image.png";
import Logo from "./../assets/SkillHub_Sidebar_logo.png";
import { Link } from 'react-router-dom'

function Login() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="login-page">
      <div className="top">
        <div className="logo-container">
          <div className="logo-section">
            <img src={Logo} className="logo-image" alt="SkillHub-logo" />
            <div class="logo-description">EMPOWERING FUTURES</div>
          </div>
        </div>
        <div className="register-direct">
        <Link to="/register">
          <button>
            <div className="register-button">Register</div>
          </button>
        </Link>
        </div>
      </div>
      <div className="bottom">
        <div className="login-container">
          <div className="login-content">
            <div className="login-form">
              <h1>Login to your account</h1>
              <div className="flex flex-col w-full gap-5">
                <Input type="email" label="Enter your Email" />
                <Input
      label="Password"
      variant="flat"
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
              </div>
              <div className="login-button-container">
                <div className="login-button">
                  <button>Login</button>
                </div>
              </div>
            </div>
          </div>
          <div className="login-image-container">
            <img className="login-image" src={loginImage} alt="login" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;