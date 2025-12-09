 
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
 import { clearAuth } from '../features/auth/authSlice'

function LogoutButton() {

 const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearAuth())
    navigate('/login', { replace: true })
  }

  return   <button onClick={handleLogout}>Logout</button>
}

export default LogoutButton