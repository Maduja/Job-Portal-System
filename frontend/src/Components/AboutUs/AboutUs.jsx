import React from "react";
import "./AboutUs.css";
import aboutUsImage from "../../assets/register3.jpg"; 
import Header from "../Header/Header";
import Footercom from "../Footer/Footercom";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="about-us-wrapper">
        <div className="about-us-content">
          <h1>About Us</h1>
          <p>
            Welcome to <strong>Job Portal</strong>, your trusted platform for connecting
            talented professionals with the right opportunities. We aim to bridge the gap
            between job seekers and employers, fostering growth and innovation in the job market.
          </p>
          <p>
            Our mission is to provide an intuitive and reliable platform where businesses
            can discover exceptional talent and individuals can achieve their career aspirations.
            We take pride in delivering a seamless, user-friendly experience for all our users.
          </p>
          <p>
            Whether you're a fresh graduate seeking your first opportunity or an established
            business looking to hire the best, <strong>Job Portal</strong> is here to support you every step of the way.
          </p>
          <div className="quote">
            <p><em>"The only way to do great work is to love what you do."</em></p>
            <p>- Steve Jobs</p>
          </div>
        </div>
        <div className="about-us-image">
          <img
            src={aboutUsImage}
            alt="About Us Illustration"
          />
        </div>
      </div>
      <Footercom />
    </>
  );
};

export default AboutUs;
