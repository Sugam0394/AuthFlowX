import React from 'react'
import AdminTopbar from '../components/admin/AdminTopbar'
import AdminSidebar from '../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

function AdminLayout(  ) {
  return (
         <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar fixed width */}
      <div style={{ width: "220px", flexShrink: 0 }}>
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <AdminTopbar />

        {/* Pages content */}
        <div style={{ padding: "20px", flex: 1, overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout