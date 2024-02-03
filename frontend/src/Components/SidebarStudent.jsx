import React, {useContext} from 'react'
import '../App.css';
import './css/Sidebar.css'
import { Link } from 'react-router-dom'
import Logo from './../assets/SkillHub_Sidebar_logo.png'
import LogoDashboard from './../assets/Dashboard_icon.png'
import LogoCourses from './../assets/Course_icon.png'
import LogoRecruitments from './../assets/Recruitments_icon.png'
import LogoDiscussions from './../assets/Discussions_icon.png'
import LogoChatbot from './../assets/Chatbot_icon.png'
import LogoLogout from './../assets/Logout_icon.png'
import { jwtDecode } from 'jwt-decode'
import AuthContext from "../context/AuthContext"



const SidebarStudent = () => {
  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  if (user){
    const decoded = jwtDecode(token)
    let user_id = decoded.user_id
  }
  return (
    <div className="Sidebar-container">
      <div className="top-container"> 

      <div className="logo-container">   <img src={Logo} className="logo-image" alt="SkillHub-logo"/> <div class="logo-description">EMPOWERING FUTURES</div> </div>
      <Link to="/student-dashboard"> <div className="nav-item"> <img src={LogoDashboard} className="nav-item-icon" alt="Dashboard-icon"/> Dashboard  </div> </Link>
      <Link to="/student-courses"> <div className="nav-item"> <img src={LogoCourses} className="nav-item-icon" alt="Courses-icon" /> Courses</div></Link>
      <Link to="/student-recruitments"> <div className="nav-item"> <img src={LogoRecruitments} className="nav-item-icon" alt="Recruitments-icon" /> Recruitments</div></Link>
      <Link to="/student-discussions"> <div className="nav-item"> <img src={LogoDiscussions} className="nav-item-icon" alt="Discussions-icon" /> Discussions</div></Link>
      </div>

      <div className="bottom-container">
      <Link to="/student-chatbot"> <div className="nav-item"> <img src={LogoChatbot} className="nav-item-icon" alt="Chatbot-icon" /> Chatbot</div></Link>
      <Link onClick={logoutUser}> <div className="nav-item"> <img src={LogoLogout} className="nav-item-icon" alt="Logout-icon" /> Logout</div></Link>
      </div>
      
    </div>
  )
}

export default SidebarStudent 