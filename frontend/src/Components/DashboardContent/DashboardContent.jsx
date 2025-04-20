import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./DashboardContent.css";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaProjectDiagram,
  FaCertificate,
  FaIdBadge,
  FaIdCard,
  FaAward
} from "react-icons/fa";

function DashboardContent() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const getdetails = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/seeker/${pk}`);
      const data = await response.json();
      console.log(data);
      setFirstName(data.firstname);
      setLastName(data.lastname);
      setPhoneNo(data.phoneno);
      setEmail(data.email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userid');
    console.log("Stored User ID:", storedUserId);
    
    if (storedUserId) {
      getdetails(storedUserId)

        // navigate("/seekerdashboard");

    } else {
      alert('No user ID found. Please log in again.');
    }
  }, []);
  
  

  return (
    <div className="dashboard-content-dash">
      <div className="profile-section-dash">
        <div className="profile-img-dash">
          <img 
            src="src/assets/profile2.jpg"
            alt="Profile Avatar" 
            className="profile-avatar-dash" 
          />
        </div>
        <h2>{firstname} {lastname}</h2>
      </div>

      <div className="details-section-dash">
        <h3>Personal Information</h3>
        <div className="info-item-dash">
          <FaIdBadge className="icon-dash" />
          <span>First Name: {firstname}</span>
        </div>
        <div className="info-item-dash">
          <FaIdCard className="icon-dash" />
          <span>Last Name: {lastname}</span>
        </div>
        <div className="info-item-dash">
          <FaEnvelope className="icon-dash" />
          <span>Email: {email}</span>
        </div>
        <div className="info-item-dash">
          <FaPhone className="icon-dash" />
          <span>Phone: {phoneno}</span>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;
