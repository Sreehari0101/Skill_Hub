import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import "./css/WelcomeBox.css";

function WelcomeBox({ welcomeImage }) {
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
    <div className="welcome-box">
      <img className="welcome-image" src={welcomeImage} alt="welcome" />
      <p className="date-text">{formattedDate}</p>
      <h1 className="welcome-text">Wecome back, {userFullname}</h1>
    </div>
  );
}

export default WelcomeBox;
