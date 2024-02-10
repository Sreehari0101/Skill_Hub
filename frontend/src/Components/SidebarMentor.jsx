import React, {useContext} from 'react'
import './css/SidebarMentor.css'
import { Link, useLocation} from 'react-router-dom'
import Logo from './../assets/SkillHub_Sidebar_logo.png'
import LogoDashboard from './../assets/Dashboard_icon.png'
import LogoCreateCourse from './../assets/Create_Course_icon.png'
import LogoMentorProfile from './../assets/Mentor_Profile_icon.png'
import LogoLogout from './../assets/Logout_icon.png'
import { jwtDecode } from 'jwt-decode'
import AuthContext from "../context/AuthContext"


const SidebarMentor = () => {
  const location = useLocation();
  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  if (user){
    const decoded = jwtDecode(token)
    let user_id = decoded.user_id
  }
  return (
    <div className="SidebarMentor-container">
    <div className="top-container"> 

    <Link to ="/"><div className="logo-container">   <img src={Logo} className="logo-image" alt="SkillHub-logo"/> <div class="logo-description">EMPOWERING FUTURES</div> </div> </Link>
    <Link to="/mentor-dashboard"> <div className="nav-item" id={`${location.pathname === '/mentor-dashboard' ? 'active' : ''}`}> <img src={LogoDashboard} className="nav-item-icon" alt="Dashboard-icon"/> Dashboard  </div> </Link>
    <Link to="/mentor-create"> <div className="nav-item" id={`${location.pathname === '/mentor-create' ? 'active' : ''}`}> <img src={LogoCreateCourse} className="nav-item-icon" alt="Create-jobs-icon" />Create Course</div></Link>
    <Link to="/mentor-profile"> <div className="nav-item" id={`${location.pathname === '/mentor-profile' ? 'active' : ''}`}> <img src={LogoMentorProfile} className="nav-item-icon" alt="profile-icon" /> Mentor Profile</div></Link>
    </div>

    <div className="bottom-container">
    
    <Link onClick={logoutUser}> <div className="nav-item"> <img src={LogoLogout} className="nav-item-icon" alt="Logout-icon" /> Logout</div></Link>
    </div>
    
  </div>
  )
}

export default SidebarMentor