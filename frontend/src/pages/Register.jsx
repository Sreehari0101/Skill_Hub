import React from "react";
import "./css/Register.css";
import { Input } from "@nextui-org/react";
import {EyeFilledIcon} from "../Components/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../Components/EyeSlashFilledIcon";
import registerImage from "../assets/Register_Image.png";
import Logo from "./../assets/SkillHub_Sidebar_logo.png";

function Register() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="register-page">
      <div className="top">
        <div className="logo-container">
          <div className="logo-section">
            <img src={Logo} className="logo-image" alt="SkillHub-logo" />
            <div class="logo-description">EMPOWERING FUTURES</div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="register-container">
          <div className="register-content">
            <div className="register-form">
              <h1>Create your account</h1>
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

<Input
      label=" Confirm Password"
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
              <div className="register-button-container">
                <div className="register-button">
                  <button>Register</button>
                </div>
              </div>
            </div>
          </div>
          <div className="register-image-container">
            <img className="register-image" src={registerImage} alt="register" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
