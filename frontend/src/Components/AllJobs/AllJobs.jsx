import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footercom from "../Footer/Footercom";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const loginState = sessionStorage.getItem("login");
    setIsLoggedIn(loginState); 
  }, []);

  const login = () => {
    window.location.href = "/login";
  };

  const getAllJobs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/job/getAllJobs/");
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const applyJob = async (jobId, empId) => {
    const userId = sessionStorage.getItem("userid");
    const applicationData = {
      seeker_id: userId,
      job_id: jobId,
      status: "pending",
      employer_id: empId,
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
      console.error("Error applying for job:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="title">
          <h2>All Jobs</h2>
        </div>
        <div className="jobs-container">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-card-header">
                <h5>{job.job_title}</h5>
                {isLoggedIn ? (
                  <button className="abtn" onClick={() => applyJob(job.id, job.user_id)}>
                    Apply
                  </button>
                ) : (
                  <button className="abtn" onClick={login}>
                    Apply
                  </button>
                )}
              </div>
              <div className="job-card-body">
                <div className="job-location">
                  <span className="icon">📍</span> {job.location}
                </div>
                <div className="job-salary">
                  <span className="icon">💲</span> {job.salary}
                </div>
                <div className="job-type">
                  <span className="icon">💼</span> {job.job_type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footercom />
    </>
  );
};

export default AllJobs;
