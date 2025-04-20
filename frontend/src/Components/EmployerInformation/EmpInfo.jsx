import React, { useEffect, useState } from "react";
import "./Empinfo.css";
import company from "../../assets/company.png";
import websiteimg from "../../assets/website.png";
import phone from "../../assets/phone.png";
import gmail from "../../assets/gmail.png";
import twitter from "../../assets/twitter.png";
import location from "../../assets/location.png";
function EmpInfo() {

  const [cname,setCname] = useState("")
  const [address,setAddress] = useState("")
  const [website,setWebsite] = useState("")
  const [phoneno,setphoneno] = useState("")
  const [email,setEmail] = useState("")
  // const [userId, setUserId] = useState(null)



  const getdetails = async (pk)=>{
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/employer/${pk}`);
      const data = await response.json();
      console.log(data)
      setCname(data.company_name)
      setAddress(data.location)
      setEmail(data.email)
      setWebsite(data.website)
      setphoneno(data.phone_no)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    const storedUserId = sessionStorage.getItem('userid');
    if(storedUserId){
      getdetails(storedUserId)
    }
    else{
      alert('No user ID found. Please log in again.')
    }
    
  },[])

  return (
    <div id="empinfo">
      <div className="row">
        <h3>Company information</h3>
      </div>
      <div className="row">
        <div className="col-5 e-card">
          <div className="head d-flex justify-content-between">
            <h5>Company Name</h5>
            <img src={company} alt="logo" />
          </div>
          <p>{cname}</p>
        </div>
        <div className="col-5 e-card">
          <div className="head d-flex justify-content-between">
            <h5>Location</h5>
            <img src={location} alt="logo" />
          </div>
          <p>{address}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-5 e-card">
          <div className="head d-flex justify-content-between">
            <h5>Contact</h5>
            <img src={phone} alt="logo" />
          </div>
          <p>{phoneno}</p>
        </div>
        <div className="col-5 e-card">
          <div className="head d-flex justify-content-between">
            <h5>Website</h5>
            <img src={websiteimg} alt="logo" />
          </div>
          <p>{website}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-5 e-card">
          <div className="head d-flex justify-content-between">
            <h5>Gmail</h5>
            <img src={gmail} alt="logo" />
          </div>
          <p>{email}</p>
        </div>
        {/* <div className="col-5 e-card">
          <div className="head d-flex justify-content-between">
            <h5>Social Media</h5>
            <img src={twitter} alt="logo" />
          </div>
          <p>Dialog</p>
        </div> */}
      </div>
    </div>
  );
}

export default EmpInfo;
