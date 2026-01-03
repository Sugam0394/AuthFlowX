import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/HomeNavbar'
 
 

function HomeLayout() {
  return (
  <>
  <Navbar />
  <Outlet />
  
  
  </>
  )
}

export default HomeLayout