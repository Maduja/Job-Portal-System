import React from "react";
import "./JobseekerRightContent.css";
import SeekedJobsTable from "../SeekedJobsTable/SeekedJobsTable";
import DashboardContent from "../DashboardContent/DashboardContent";

function JobseekerRightContent({ activeSection }) {
  return (
    <div className="col-md-9 right">
      <div className="container">
        {activeSection === "dashboard" && (
          <DashboardContent />
        )}
        {activeSection === "seekedJobs" && (
          <SeekedJobsTable />
        )}
      </div>
    </div>
  );
}

export default JobseekerRightContent;
