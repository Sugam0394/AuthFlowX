import { Link } from "react-router-dom";
import "./DashbaordNavigation.css"
 

import React from 'react'

 import useLogout from "./useLogout";


function DashboardNavigation() {

    const Logout = useLogout();
   

   




  return (
     <nav className="dashboard-nav">
  <div className="dashboard-logo">AI-Mart</div>

  <div className="dashboard-links">
    <Link to="/dashboard">Dashboard</Link>
     <Link to="/explore">Explore</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/saved">Saved</Link>
    <button className="dashboard-logout" onClick={Logout}>
      Logout
    </button>
    
        
  </div>
</nav>

     
  )
}

export default DashboardNavigation