import React, { useState } from 'react';
import Employerregister from '../../Components/EmployerRegister/Employerregister';
import Seekerregister from '../../Components/SeekerRegister/Seekerregister';
import './Register.css';
import Header from '../../Components/Header/Header';
function Register() {
  const [isEmployer, setIsEmployer] = useState(false); // Default is false for seeker registration

  const handleToggle = () => {
    setIsEmployer((prevState) => !prevState); // Toggle between employer and seeker
  };

  return (
    <>
        <Header/>
      <div className='handle'>
        <button onClick={handleToggle}>
          {isEmployer ? 'Switch to Jobseeker' : 'Switch to Employer'}
        </button>
      </div>
      <div>
        {isEmployer ? <Employerregister /> : <Seekerregister />}
      </div>
    </>
  );
}

export default Register;
