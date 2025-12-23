import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardNavigation from '../components/DashboardNavigation'

function AppLayout() {
  return (
     <>

     <DashboardNavigation />
     <Outlet />

     </>
  )
}

export default AppLayout