import React from "react";
import "./css/Login.css";
import { Input } from "@nextui-org/react";
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
            <div className="flex flex-col w-9/12 gap-5">
              <Input type="email" label="Enter your Email" />
              <Input type="email" label="Password" />
            </div>
            </div>
          </div>
          <div className="login-image-container"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
