import React from "react";
import "./css/Login.css";
import { Input } from "@nextui-org/react";
import loginImage from "../assets/Login_Image.png";
import Logo from "./../assets/SkillHub_Sidebar_logo.png";

function Login() {
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
          <button>
            <div className="register-button">Register</div>
          </button>
        </div>
      </div>
      <div className="bottom">
        <div className="login-container">
          <div className="login-content">
            <div className="login-form">
              <h1>Login to your account</h1>
              <div className="flex flex-col w-full gap-5">
                <Input type="email" label="Enter your Email" />
                <Input type="email" label="Password" />
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
