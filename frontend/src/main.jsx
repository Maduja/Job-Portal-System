import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import EmpDashBoard from './Pages/EmployerDashboard/EmpDashBoard';
import JobseekerDashBoard from './Pages/JobSeekerDashboard/JobseekerDashBoard';
import Register from './Pages/RegisterPage/Register';
import Login from './Pages/Login/login';
import AboutUs from './Components/AboutUs/AboutUs';
import AllJobs from './Components/AllJobs/AllJobs';




const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
  },
  {
    path: "/aboutus",
    element:<AboutUs/>,
  },
  {
    path: "/employerDashboard",
    element:<EmpDashBoard/>,
  },
  {
    path: "/register",
    element:<Register/>,
  },
  {
    path:"/login",
    element:<Login/>

  },
  {
    path:"/seekerdashboard",
    element:<JobseekerDashBoard/>

  },
  {
    path:"/job",
    element:<AllJobs/>

  },
  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
