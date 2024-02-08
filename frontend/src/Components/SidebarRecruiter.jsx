import React, {useContext} from 'react'
import './css/SidebarRecruiter.css'
import { Link } from 'react-router-dom'
import Logo from './../assets/SkillHub_Sidebar_logo.png'
import LogoDashboard from './../assets/Dashboard_icon.png'
import LogoCreateJobs from './../assets/Create_Openings_icon.png'
import LogoCompanyProfile from './../assets/Company_Profile_icon.png'
import LogoLogout from './../assets/Logout_icon.png'
import { jwtDecode } from 'jwt-decode'
import AuthContext from "../context/AuthContext"

const SidebarRecruiter = () => {
  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  if (user){
    const decoded = jwtDecode(token)
    let user_id = decoded.user_id
  }
  return (
    <div className="SidebarRecruiter-container">
      <div className="top-container"> 

      <Link to ="/"> <div className="logo-container">   <img src={Logo} className="logo-image" alt="SkillHub-logo"/> <div class="logo-description">EMPOWERING FUTURES</div> </div> </Link>
      <Link to="/recruiter-dashboard"> <div className="nav-item"> <img src={LogoDashboard} className="nav-item-icon" alt="Dashboard-icon"/> Dashboard  </div> </Link>
      <Link to="/recruiter-create"> <div className="nav-item"> <img src={LogoCreateJobs} className="nav-item-icon" alt="Create-jobs-icon" />Post Recruitments</div></Link>
      <Link to="/recruiter-profile"> <div className="nav-item"> <img src={LogoCompanyProfile} className="nav-item-icon" alt="profile-icon" /> Company Profile</div></Link>
      </div>

      <div className="bottom-container">
      
      <Link onClick={logoutUser}> <div className="nav-item"> <img src={LogoLogout} className="nav-item-icon" alt="Logout-icon" /> Logout</div></Link>
      </div>
      
    </div>
  )
}

export default SidebarRecruiter 