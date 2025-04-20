import React, { useState, useEffect } from "react";
import { Briefcase, MapPin, DollarSign, List, Info } from "lucide-react";
import "./SeekedJobsTable.css";

function SeekedJobsTable() {
  const [jobs, setJobs] = useState([]);

  const fetchAppliedJobs = async (seekerId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/jobs/user/${seekerId}/`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch applied jobs");
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error(error.message);
      alert("Error fetching applied jobs.");
    }
  };

  useEffect(() => {
    const storedSeekerId = sessionStorage.getItem("userid");
    if (storedSeekerId) {
      fetchAppliedJobs(storedSeekerId);
    } else {
      alert("No seeker ID found. Please log in again.");
    }
  }, []);

  return (
    <div>
      <h1 className="page-heading-seeked">Your Applied Jobs</h1>
      <div className="cards-container-seeked">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="job-card-seeked" key={job.application_id}>
              <div className="image-side-seeked">
                <img src="src/assets/profile9.jpg" alt="Job" />
              </div>
              <div className="card-content-seeked">
                <h3 className="job-title-seeked">{job.job_title}</h3>
                <p>
                  <Briefcase className="icon-seeked" /> <strong>Job Type:</strong> {job.job_type}
                </p>
                <p>
                  <MapPin className="icon-seeked" /> <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <DollarSign className="icon-seeked" /> <strong>Salary:</strong> {job.salary}
                </p>
                <p>
                  <List className="icon-seeked" /> <strong>Category:</strong> {job.job_category}
                </p>
                <p>
                  <Info className="icon-seeked" /> <strong>Description:</strong> {job.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-jobs-seeked">No jobs applied yet.</p>
        )}
      </div>
    </div>
  );
}

export default SeekedJobsTable;