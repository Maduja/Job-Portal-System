import React from "react";
import "./JobseekerLeftContent.css";
import Emplink from "../EmpLinks/Emplink";
import { MdHome } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";



function JobseekerLeftContent({ setActiveSection, activeSection,setIsLoggedIn }) {
  
  const handleLogout = () => {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("userid");

    window.location.href = "/";
  };


  return (
    <div className="col-md-2 left">
      <div className="navigation">
        <Emplink
          text="Dashboard"
          icon={<MdHome />}
          currentSection={activeSection === "dashboard"}
          onClick={() => setActiveSection("dashboard")}
        />
        <Emplink
          text="Seeked Jobs"
          icon={<IoBagCheckOutline />}
          currentSection={activeSection === "seekedJobs"}
          onClick={() => setActiveSection("seekedJobs")}
        />
      </div>
      <div className="navigation">
            <Emplink
          text="Sign out"
          icon={<FaSignOutAlt />}
          className="signout"
          onClick={handleLogout}
        />
</div>
    </div>
  );
}

export default JobseekerLeftContent;
