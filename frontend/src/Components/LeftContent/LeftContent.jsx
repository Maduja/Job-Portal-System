import React from "react";
import "./LeftContent.css";
import { FaArrowRight } from "react-icons/fa";

function LeftContent() {
  return (
    <div className="col-md-4 leftcontent">
      <div className="sub">
        <h1>Find Your Dream Job Today!</h1>
        <br />
        <p>
          Unlock endless career opportunities with our platform. Whether you're 
          a seasoned professional or just starting your journey, we connect you 
          with top employers looking for talent like you. Take the first step 
          toward your brighter future now!
        </p>
        <br />
        <a href="/register">
          <button className="animated-button">
            JOIN US&nbsp;&nbsp;<FaArrowRight className="icon" />
          </button>
        </a>
      </div>
    </div>
  );
}

export default LeftContent;
