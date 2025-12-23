 
import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../utils/auth';
 

function ProtectedRoute() {
 
 
   const token = getAccessToken();


 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar login hai → children render karo
  return <Outlet />;
};
  
 

export default ProtectedRoute