import React, {useState, useEffect, useContext}  from "react";
import "./css/Certificate.css";
import AuthContext from "../context/AuthContext";
import logo1 from "../assets/SkillHub_Homepage_logo.png";

const Certificate= React.forwardRef(({courseName, courseOwner}, ref) => {
    const { user } = useContext(AuthContext);
    const [userFullname, setUserFullname] = useState("");
  
    useEffect(() => {
      if (user) {
        setUserFullname(user.full_name);
      }
    }, [user]);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    
  return (
    <div  ref={ref} className="certificate">
      <div className="top">
        <div className="logo-container">
          <img src={logo1} className="logo-image" alt="SkillHub-logo" />
          <div class="logo-description">EMPOWERING FUTURES</div>
        </div>
        <div className="credentials-container">
          <h3> Certificate no : UC-3308c41b-93cb-485a-9ee3-60623-1f8ef113</h3>
          <h3> Reference no : 0002</h3>
        </div>
      </div>
      <div className="middle">
        <h2> CERTIFICATE OF COMPLETION</h2>
        <h1>{courseName}</h1>
        <h2>Instructor : {courseOwner}</h2>
      </div>

      <div className="bottom">
        <h1>{userFullname}</h1>
        <h2>Date : {formattedDate}</h2>
      </div>
    </div>
  );
});

export default Certificate;
