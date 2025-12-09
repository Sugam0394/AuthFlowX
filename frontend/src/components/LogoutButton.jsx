 
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
 import { clearAuth } from '../features/auth/authSlice'
 import '../styles/LogoutButton.css'

function LogoutButton() {

 const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearAuth())
    navigate('/login', { replace: true })
  }

  return   (
    
    
    <button className='logout-btn' onClick={handleLogout}>Logout</button>
  )

}

export default LogoutButton