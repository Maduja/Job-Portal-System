import React, { useEffect, useState } from "react";
import "./job.css";

function Job() {
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginState = sessionStorage.getItem("login");
    setIsLoggedIn(loginState);
  }, []);

  const login = () => {
    window.location.href = "/login";
  };

  const applyjob = async (jobid, empid) => {
    const userid = sessionStorage.getItem("userid");
    const applicationData = {
      seeker_id: userid,
      job_id: jobid,
      status: "pending",
      employer_id: empid,
      applied_date: new Date().toISOString(),
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/job/apply/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        alert("You have successfully applied for the job.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again later.");
    }
  };

  const getJobs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/job/latestjob/");
      const data = await response.json();
      console.log(data);
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="container">
      <div className="title">
        <h2>Latest Job Opportunities</h2>
      </div>
      <div className="job-grid">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <h5>{job.job_title}</h5>
              {isLoggedIn ? (
                <button className="abtn" onClick={() => applyjob(job.id, job.user_id)}>
                  Apply
                </button>
              ) : (
                <button className="abtn" onClick={login}>
                  Apply
                </button>
              )}
            </div>
            <div className="job-card-body">
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Type:</strong> {job.job_type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Job;
