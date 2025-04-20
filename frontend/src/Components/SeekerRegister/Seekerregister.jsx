// Seekerregister.jsx
import React, { useState } from 'react';
import './Seekerregister.css';

function Seekerregister() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [error, setError] = useState(""); // To handle error messages
    const [success, setSuccess] = useState(""); // To handle success messages

    const JobSeekerRegister = async (event) => {
        event.preventDefault();

        if (password !== cpassword) {
            alert("Passwords do not match!");
            return;
        }

        const seekerData = {
            firstname,
            lastname,
            phoneno,
            email,
            password,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/seeker/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(seekerData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data);
                setSuccess("Jobseeker Registration Successful!");
                setError("");
                window.location.href = "/login"; // Redirect to login page
            } else {
                setError("Registration failed. Please try again.");
                setSuccess("");
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred while submitting the form.");
            setSuccess("");
        }
    };

    return (
        <div className="seeker-container">
            <div className="seeker-form-wrapper">
                <form onSubmit={JobSeekerRegister} className="form-card-seeker">
                    <h2>Jobseeker Registration</h2>
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}
                    <div className="form-content-seeker">
                        <div className="image-side-seeker">
                            <img src="src/assets/register4.jpg" alt="Jobseeker Registration" />
                        </div>
                        <div className="form-fields">
                            <div className="form-left">
                                <label>
                                    First Name:
                                    <input type="text" name="firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
                                </label>

                                <label>
                                    Last Name:
                                    <input type="text" name="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} required />
                                </label>

                                <label>
                                    Phone Number:
                                    <input type="tel" name="phoneno" value={phoneno} onChange={(e) => setPhoneno(e.target.value)} required />
                                </label>
                            </div>
                            <div className="form-right">
                                <label>
                                    Email:
                                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
                    <button type="submit">Register as Jobseeker</button>
                </form>
            </div>
        </div>
    );
}

export default Seekerregister;
