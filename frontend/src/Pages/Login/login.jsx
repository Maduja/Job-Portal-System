import React, { useState } from "react";
import "./login.css";
import Header from "../../Components/Header/Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/${userType}/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("userid", userType === "employer" ? data.employer_id : data.seeker_id);
        sessionStorage.setItem("login", true);
        window.location.href = userType === "employer" ? "/employerDashboard" : "/";
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="login-main">
        <div className="login-form">
          <h2>Sign in to your account</h2>
          <form onSubmit={handleSubmit}>
            {/* Radio buttons for user type */}
            <div className="radio-container">
              <label className={`radio-card ${userType === "employer" ? "active" : ""}`}>
                <input
                  type="radio"
                  value="employer"
                  checked={userType === "employer"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <div className="radio-content">
                  <h3>Employer</h3>
                  <p>Sign in as an employer to manage job postings and candidates.</p>
                </div>
              </label>
              <label className={`radio-card ${userType === "seeker" ? "active" : ""}`}>
                <input
                  type="radio"
                  value="seeker"
                  checked={userType === "seeker"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <div className="radio-content">
                  <h3>Seeker</h3>
                  <p>Sign in as a job seeker to explore opportunities.</p>
                </div>
              </label>
            </div>
            {/* Email input */}
            <div>
              <label>Email: </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Password input */}
            <div>
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Submit button */}
            <div>
              <button type="submit">Login</button>
            </div>
            <div>
              Don't have an account? <a href="/register">Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
