import React, { useEffect, useState } from "react";
import "./Numbers.css";
function Numbers() {

  const [count,setCount] = useState({jobs:0,companies:0,users:0})

  const getcount = async()=>{
    try {
      const response = await fetch("http://127.0.0.1:8000/api/count/");
      const data = await response.json();
      setCount(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getcount()
  },[])
  return (
    <div className="numbers">
      <div className="container">
        <div className="row">
          <div className="col-md-3 text">
            <h1>
              <p>SOME</p>
              NUMBERS
            </h1>
          </div>
          <div className="col-md-3 number custom-mb">
            <span className="fa fa-briefcase" aria-hidden="true"></span>
            <h3>{count.jobs} +</h3>
            <hr></hr>
            <p>JOBS</p>
          </div>
          <div className="col-md-3 number custom-mb">
            <span className="fa fa-user-circle" aria-hidden="true"></span>
            <h3>{count.users} +</h3>
            <hr></hr>
            <p>MEMBERS</p>
          </div>
          <div className="col-md-3 number custom-mb">
            <span className="fa fa-building" aria-hidden="true"></span>
            <h3>{count.companies} +</h3>
            <hr></hr>
            <p>COMPANY</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Numbers;
