import React from "react";
import "./EmpLeftContent.css";
import Emplink from "../EmpLinks/Emplink";
import { MdHome } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoBag } from "react-icons/io5";

function EmpLeftContent({ setActiveSection,activeSection }) {

  const Logout = () => {
    // sessionStorage.removeItem('userid');
    // window.location.href = '/';
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("userid");

    window.location.href = "/";
  };
  

  return (
    <div className="col-md-2 left">
      {/* <div id="profile">
        <div className="profileimg">
          <img src='' alt="image"></img>
        </div>
      </div> */}
      <div className="navigation">
        {/* <Emplink text="Dashboard" icon={<MdHome />} /> */}
        <Emplink text="Account" icon={<MdManageAccounts />} currentSection={activeSection === 'account'} onClick={() => setActiveSection('account')}/>
        <Emplink text="Jobs" icon={<IoBag />} currentSection={activeSection === 'jobs'} onClick={() => setActiveSection('jobs')}/>
        <Emplink text="Applications" icon={<FaEnvelopeOpenText />} currentSection={activeSection === 'application'} onClick={() => setActiveSection('application')}/>   
      </div>
      <div>
      <Emplink text="Sign out" icon={<FaSignOutAlt />} onClick={Logout} />
      </div>
      
    </div>
  );
}

export default EmpLeftContent;
