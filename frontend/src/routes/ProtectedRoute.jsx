 
import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../utils/auth';
import { useSelector } from 'react-redux';
 

function ProtectedRoute() {
 
 
   const token = getAccessToken();
   const user = useSelector((state) => state.auth.user)


 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

 // 🔴 Logged in but field not selected
  if (user && !user.field) {
    return <Navigate to="/select-field" replace />;
  }


  // Agar login hai → children render karo
  return <Outlet />;
};
  
 

export default ProtectedRoute