import React from "react";
import svg from "../assets/404.svg";
import "./css/PageNotFound.css";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
  
    const handleBackToHome = () => {
      navigate(-1);
    };
    return (
        <>
            <div className="cont-404">
                <img src={svg} alt="svg" />
                <button onClick={handleBackToHome}>Go back to Previous Page</button>
            </div>
        </>
    );
};

export default PageNotFound;