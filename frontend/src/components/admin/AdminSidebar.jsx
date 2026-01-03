import React from 'react'
import { NavLink } from 'react-router-dom'
import './AdminSidebar.css'

function AdminSidebar() {
  return (
        <div className="admin-sidebar">
      <h2 className="logo">Admin Panel</h2>

      <ul className="nav-list">
        <li>
          <NavLink to="/admin/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/tools" className="nav-link">
            Tools
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/reviews" className="nav-link">
            Reviews
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default AdminSidebar