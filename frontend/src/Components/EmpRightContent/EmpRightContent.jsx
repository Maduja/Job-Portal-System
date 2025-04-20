import React from "react";
import "./EmpRightContent.css";
import JobsTable from "../JobsTable/JobsTable";
import EmpInfo from "../EmployerInformation/EmpInfo";
import ApplicationTable from "../ApplicationsTable/ApplicationTable";
function EmpRightContent({ activeSection }) {
  return (
    <div className="col-md-9 right">
      <div className="container">
        {activeSection === "jobs" && (
         <JobsTable/>
        )}
        {activeSection === "account" && (
         <EmpInfo/>
        )}
        {activeSection === "application" && (
          <ApplicationTable/>
        )}
      </div>
    </div>
  );
}

export default EmpRightContent;
