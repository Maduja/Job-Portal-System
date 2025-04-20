import React, { useEffect, useState } from "react";
import "./application.css";

function ApplicationTable() {
  const [applications, setApplications] = useState([]);

  const getApplications = async (pk) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/applications/${pk}`
      );
      const data = await response.json();
      setApplications(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (applicationId, newStatus) => {
    try {
      // Optimistically update the UI before making the API call
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application.application_id === applicationId
            ? { ...application, status: newStatus }
            : application
        )
      );

      const response = await fetch(
        `http://127.0.0.1:8000/api/applications/update/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Failed to update application status.");
        // Revert the optimistic update in case of failure
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application.application_id === applicationId
              ? { ...application, status: "pending" }
              : application
          )
        );
      } else {
        alert("Application status updated successfully.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating the status.");
      // Revert the optimistic update in case of error
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application.application_id === applicationId
            ? { ...application, status: "pending" }
            : application
        )
      );
    }
  };

  useEffect(() => {
    const employerId = sessionStorage.getItem("userid");
    if (employerId) {
      getApplications(employerId);
    } else {
      alert("No user ID found. Please log in again.");
    }
  }, []);

  return (
    <div id="applicationtable">
      <div className="table-responsive applicationtable">
        <table class="table table-striped table-hover table-light">
          <thead>
            <tr>
              <th scope="col">Application_Id</th>
              <th scope="col">Job_Title</th>
              <th scope="col">Seeker_Name</th>
              <th scope="col">Apply_Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.application_id}>
                <th scope="row">{application.application_id}</th>
                <td>{application.job_title}</td>
                <td>{application.user_name}</td>
                <td>{application.apply_date}</td>
                <td>
                  {application.status === "pending" ? (
                    <select
                      onChange={(e) =>
                        updateStatus(application.application_id, e.target.value)
                      }
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Status
                      </option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  ) : (
                    <button
                      className={`btn ${
                        application.status === "approved"
                          ? "btn-success"
                          : "btn-danger"
                      }`}
                    >
                      {application.status === "approved"
                        ? "Approved"
                        : "Rejected"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApplicationTable;
