import React from 'react'
import './css/SidebarMentor.css'
import { Link } from 'react-router-dom'
import Logo from './../assets/SkillHub_Sidebar_logo.png'
import LogoDashboard from './../assets/Dashboard_icon.png'
import LogoCreateCourse from './../assets/Create_Course_icon.png'
import LogoMentorProfile from './../assets/Mentor_Profile_icon.png'
import LogoLogout from './../assets/Logout_icon.png'


function SidebarMentor() {
  return (
    <div className="SidebarMentor-container">
    <div className="top-container"> 

    <div className="logo-container">   <img src={Logo} className="logo-image" alt="SkillHub-logo"/> <div class="logo-description">EMPOWERING FUTURES</div> </div>
    <Link to="/mentor-dashboard"> <div className="nav-item"> <img src={LogoDashboard} className="nav-item-icon" alt="Dashboard-icon"/> Dashboard  </div> </Link>
    <Link to="/mentor-create"> <div className="nav-item"> <img src={LogoCreateCourse} className="nav-item-icon" alt="Create-jobs-icon" />Create Course</div></Link>
    <Link to="/mentor-profile"> <div className="nav-item"> <img src={LogoMentorProfile} className="nav-item-icon" alt="profile-icon" /> Mentor Profile</div></Link>
    </div>

    <div className="bottom-container">
    
    <Link to="/"> <div className="nav-item"> <img src={LogoLogout} className="nav-item-icon" alt="Logout-icon" /> Logout</div></Link>
    </div>
    
  </div>
  )
}

export default SidebarMentor