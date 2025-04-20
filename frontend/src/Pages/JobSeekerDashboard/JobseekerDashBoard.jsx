import React from "react";
import "./JobseekerDashBoard.css";
import JobseekerLeftContent from "../../Components/JobseekerLeftContent/JobseekerLeftContent";
import JobseekerRightContent from "../../Components/JobseekerRightContent/JobseekerRightContent";
import { useState } from "react";

function JobseekerDashBoard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div id="jobseeker">
      <div className="subjobseeker">
        <div className="row">
          <JobseekerLeftContent setActiveSection={setActiveSection} activeSection={activeSection} />
          <JobseekerRightContent activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
}

export default JobseekerDashBoard;
