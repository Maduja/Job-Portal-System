import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footercom.css';

function Footercom() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          <span style={{ fontSize: "20px" }}>&copy;</span>&nbsp;2025 Job_Portal. All rights reserved.
        </p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footercom;
