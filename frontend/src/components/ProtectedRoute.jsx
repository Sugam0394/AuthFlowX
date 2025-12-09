 
import { useSelector } from 'react-redux'
import {Navigate} from 'react-router-dom'
 
 
 function ProtectedRoute({Children}) {
  const { user } = useSelector((state) => state.user.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }




   return  Children
 }
 
 export default ProtectedRoute