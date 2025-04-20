import React, { useEffect, useState } from "react";
import axios from "axios";

function JobsTable() {
  const [jobs, setJobs] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert,setShowUpdateAlert] = useState(false);

  // getjobs
  const getJobs = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/jobs/${pk}`);
      const data = await response.json();
      console.log(data);
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const jobDetails = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/job/${pk}`);
      const data = await response.json();
      console.log(data.id);
      setTitle(data.job_title)
      setType(data.job_type)
      setCategory(data.job_category)
      setLocation(data.location)
      setDescription(data.description)
      setSalary(data.salary)
      setId(data.id)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userid');
    if(storedUserId){
      getJobs(storedUserId);
    }
    else{
      alert('No user ID found. Please log in again.')
    }
   
  }, []);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  // addjob
  const AddJob = async () => {
    const storedUserId = sessionStorage.getItem('userid');
    const jobData = {
      job_title: title,
      job_type: type,
      location: location,
      salary: salary,
      description: description,
      job_category: category,
      user_id: storedUserId,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/job/createjob/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();
      console.log(data);
      const modal = document.getElementById("staticBackdrop");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      setShowAlert(true);
      getJobs();
    } catch (error) {
      console.log(error);
    }
  };

  // deletejob
  const deletejob = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/job/update/${pk}`, {
        method: "DELETE",
      });

      setShowDeleteAlert(true);
      setJobs((prev) => prev.filter((job) => job.id !== pk));
    } catch (error) {
      console.log(error);
    }
  };

  const updatejob = async (pk) => {
    const storedUserId = sessionStorage.getItem('userid');
    const jobData = {
      job_title: title,
      job_type: type,
      location: location,
      salary: salary,
      description: description,
      job_category: category,
      user_id: storedUserId,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/job/update/${pk}`, {
        method: "PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(jobData),
      });

      // setShowDeleteAlert(true);
      const data = await response.json();
      const modal = document.getElementById("exampleModal");
      const modalInstance = bootstrap.Modal.getInstance(modal);
      modalInstance.hide();
      setShowUpdateAlert(true);
      setJobs((prev) => prev.map((job) => {
        if(job.id == pk){
          return data;
        }
        else{
          return job;
        }
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" jobstable">
        <div className="row">
          <button
            className="job-btn ms-auto"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add Job
          </button>
        </div>
        <div className="mt-3">
          {showAlert && (
            <div className="alert alert-success" role="alert">
              Job added successfully!
            </div>
          )}
          {showDeleteAlert && (
            <div className="alert alert-success" role="alert">
              Job Delete successfully!
            </div>
          )}
          {showUpdateAlert && (
            <div className="alert alert-success" role="alert">
              Job Update successfully!
            </div>
          )}
        </div>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog ">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Job Title</label>
                  <input
                    type="text"
                    class="form-control"
                    name="title"
                    value={title}
                    placeholder="eg: Professional UI/UX Designer"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Job Type</label>
                  <select
                    className="form-control"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Job Type
                    </option>
                    <option value="Full-Time">Full Time</option>
                    <option value="Part-Time">Part Time</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Job Category</label>
                  <select
                    class="form-control"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Job Category
                    </option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Location</label>
                  <input
                    type="text"
                    class="form-control"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Western City,UK"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Salary</label>
                  <input
                    type="text"
                    class="form-control"
                    name="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="Rs : 100000.00"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Job Description</label>
                  <textarea
                    class="form-control"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary" onClick={AddJob}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive mt-3">
          <table class="table table-striped table-hover table-light">
            <thead>
              <tr>
                <th scope="col">Job_Id</th>
                <th scope="col">Job_Title</th>
                <th scope="col">Job_Type</th>
                <th scope="col">Job_Category</th>
                <th scope="col">Salary</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <th scope="row">{job.id}</th>
                  <td>{job.job_title}</td>
                  <td>{job.job_type}</td>
                  <td>{job.job_category}</td>
                  <td>{job.salary}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={()=> jobDetails(job.id)}
                    >
                      Update
                    </button>

                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                              Modal title
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <div class="form-group">
                              <label for="exampleInputEmail1">Job Title</label>
                              <input
                                type="text"
                                class="form-control"
                                name="title"
                                value={title}
                                placeholder="eg: Professional UI/UX Designer"
                                onChange={(e) => setTitle(e.target.value)}
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">
                                Job Type
                              </label>
                              <select
                                class="form-control"
                                name="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                              >
                                <option value="" disabled>
                                  Select Job Type
                                </option>
                                <option value="Full-Time">Full Time</option>
                                <option value="Part-Time">Part Time</option>
                              </select>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">
                                Job Category
                              </label>
                              <select
                                class="form-control"
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                              >
                                <option value="" disabled>
                                  Select Job Category
                                </option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="IT">IT</option>
                                <option value="Finance">Finance</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Education">Education</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">
                                Location
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Western City,UK"
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">Salary</label>
                              <input
                                type="text"
                                class="form-control"
                                name="salary"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="Rs : 100000.00"
                              />
                            </div>
                            <div class="form-group">
                              <label for="exampleInputPassword1">
                                Job Description
                              </label>
                              <textarea
                                class="form-control"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              class="btn btn-primary"
                              onClick={()=>updatejob(id)}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deletejob(job.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default JobsTable;
