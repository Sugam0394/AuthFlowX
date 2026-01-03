import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import { getAccessToken } from '../utils/auth';
 
 


function AdminProtectedRoute( ) {
   const token = getAccessToken();
 

  // 🔐 No token → not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

 
  
  return    <Outlet />
}

export default AdminProtectedRoute