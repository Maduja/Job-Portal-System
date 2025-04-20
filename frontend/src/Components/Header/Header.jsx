import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/icons8-bag-100.png';
import MenuLink from '../Links/MenuLink';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const loginState = sessionStorage.getItem("login");
    setIsLoggedIn(loginState);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const handleLogout = () => {
  //   sessionStorage.removeItem("login");
  //   sessionStorage.removeItem("userid");
  //   setIsLoggedIn(false);
  //   window.location.href = "/";
  // };

  const handleUserIconClick = () => {
    window.location.href = "/seekerdashboard";//userpage
  };

  return (
    <div id="header">
      <div className="logo">
        <img src={logo} alt="logo" />
        <span className="bold-text">Job Portal</span>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className={`navigation ${menuOpen ? 'active' : ''}`}>
        <MenuLink name="Home" link="/" />
        <MenuLink name="Jobs" link="/job" />
        <MenuLink name="About Us" link="/aboutus" />
        {isLoggedIn ? (
          <div className="user-section">
            <FaUserCircle
              className="user-icon"
              title="Profile"
              onClick={handleUserIconClick}
            />
            <div className="logout-button">
               Profile
            </div>
          </div>
        ) : (
          <MenuLink name="Login" link="/login" />
        )}
      </div>
    </div>
  );
}

export default Header;
