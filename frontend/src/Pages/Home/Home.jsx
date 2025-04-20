import React from 'react'
import Header from '../../Components/Header/Header'
import './Home.css'
import LeftContent from '../../Components/LeftContent/LeftContent'
import RightContent from '../../Components/RightContent/RightContent'
import Numbers from '../../Components/Numbers/Numbers'
import Job from '../../Components/Job/job'
import Footercom from '../../Components/Footer/Footercom'
function Home() {
  return (
    <div id='home'>
      <div className='subhome'>
        <Header/>
        <div className="row">
            <LeftContent/>
            <RightContent/>
        </div>
      </div>
      <div className="container-fluid mt-3 jobsection">
        <Job/>
      </div>
      
      <Numbers/>
      
      <Footercom/>
    </div>
  )
}

export default Home
