import React from 'react'
import useLogout from '../useLogout'
import './AdminTopbar.css'

function AdminTopbar() {

  // Example: replace with Redux / Context value
  const adminName = "Sugam Singh";

   const Logout = useLogout();





  return (
      <div className="admin-topbar">
      <h4 className="admin-welcome">Welcome {adminName}</h4>
     <button className="dashboard-logout" onClick={Logout}>
      Logout
    </button>
    </div>
  )
}

export default AdminTopbar