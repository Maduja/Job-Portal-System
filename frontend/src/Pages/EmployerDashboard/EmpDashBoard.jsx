import React from "react";
import "./EmpDashBoard.css";
import EmpLeftContent from "../../Components/EmpLeftContent/EmpLeftContent";
import EmpRightContent from "../../Components/EmpRightContent/EmpRightContent";
import { useState } from "react";
function EmpDashBoard() {
  const [activeSection, setActiveSection] = useState('account');
  return (
    <div id="employer">
      <div className="subemp">
       
        <div className="row">
          <EmpLeftContent setActiveSection={setActiveSection} activeSection={activeSection}/>
          <EmpRightContent activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
}

export default EmpDashBoard;
