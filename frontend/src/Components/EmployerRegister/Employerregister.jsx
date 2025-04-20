import React, { useState } from 'react';
import './Employerregister.css';

function Employerregister() {
    const [companyname, setCompanyname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [website, setWebsite] = useState("");
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [error, setError] = useState(""); // To handle error messages
    const [success, setSuccess] = useState(""); // To handle success messages

    const EmployerRegister = async (event) => {
        event.preventDefault();  // Prevent default form submission behavior

        if (password !== cpassword) {
            alert("Passwords do not match!");
            return;
        }

        const employerData = {
            email,
            password,
            role: 'employer',
            company_name: companyname,
            phone_no: phoneno,
            website,
            location,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/employer/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employerData),
            });

            const data = await response.json();
            
            if (response.ok) {
                console.log(data);
                setSuccess("Employer Registration Successful!"); // Show success message
                setError(""); // Clear any previous errors
            } else {
                setError(data.detail || "Registration failed. Please try again."); // Show error message
                setSuccess(""); // Clear any previous success message
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred while submitting the form.");
            setSuccess("");
        }
    };

    return (
        <div className="employer-container">
            <div className="employer-form-wrapper">
                <form onSubmit={EmployerRegister} className="form-card-employee">
                    <h2>Employer Registration</h2>
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}
                    <div className="form-content-employee">
                        <div className="image-side-employee">
                            <img src="src/assets/register2.jpg" alt="Employer Registration" />
                        </div>
                        <div className="form-fields">
                            <div className="form-left">
                                <label>
                                    Company Name:
                                    <input type="text" name="companyName" value={companyname} onChange={(e) => setCompanyname(e.target.value)} required />
                                </label>

                                <label>
                                    Contact Email:
                                    <input type="email" name="contactEmail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </label>

                                <label>
                                    Phone no:
                                    <input type="text" name="phoneno" value={phoneno} onChange={(e) => setPhoneno(e.target.value)} required />
                                </label>

                                <label>
                                    Website:
                                    <input type="url" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} required />
                                </label>
                            </div>
                            <div className="form-right">
                                <label>
                                    Location:
                                    <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                </label>

                                <label>
                                    Password:
                                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </label>

                                <label>
                                    Confirm Password:
                                    <input type="password" name="cpassword" value={cpassword} onChange={(e) => setCpassword(e.target.value)} required />
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit">Register as Employer</button>
                </form>
            </div>
        </div>
    );
}

export default Employerregister;