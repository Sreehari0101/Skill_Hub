import React, { useState, useContext } from "react";
import "./css/Register.css";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../Components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../Components/EyeSlashFilledIcon";
import registerImage from "../assets/Register_Image.png";
import Logo from "./../assets/SkillHub_Sidebar_logo.png";
import AuthContext from "../context/AuthContext";
import { Select, SelectItem } from "@nextui-org/react";

const Register = () => {
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [value, setValue] = useState(new Set([]));

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedRole = Array.from(value)[0];
    const userData = {
      full_name,
      email,
      username,
      password,
      password2,
      selectedRole,
    };
    console.log("User Data:", userData);
    registerUser(full_name, email, username, password, password2, selectedRole);
  };

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
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full gap-5">
                  <Input
                    type="text"
                    label="Enter your Full name"
                    name="full_name"
                    onChange={(e) => setFull_name(e.target.value)}
                    isRequired
                  />
                  <Input
                    type="email"
                    label="Enter your Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired
                  />
                  <Input
                    type="text"
                    label="Enter a Username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    isRequired
                  />
                  <Input
                    label="Password"
                    variant="flat"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    isRequired
                  />

                  <Input
                    label=" Confirm Password"
                    variant="flat"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        isRequired
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    name="password2"
                    onChange={(e) => setPassword2(e.target.value)}
                    isRequired
                  />

                  <Select
                    label="Role"
                    isRequired
                    selectedKeys={value}
                    className="max-w-xs"
                    onSelectionChange={setValue}
                  >
                    <SelectItem value="student" key="student">
                      Student
                    </SelectItem>
                    <SelectItem value="mentor" key="mentor">
                      Mentor
                    </SelectItem>
                    <SelectItem value="recruiter" key="recruiter">
                      Recruiter
                    </SelectItem>
                  </Select>
                </div>

                <div className="register-button-container">
                  <div className="register-button">
                    <button type="submit">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="register-image-container">
            <img
              className="register-image"
              src={registerImage}
              alt="register"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
