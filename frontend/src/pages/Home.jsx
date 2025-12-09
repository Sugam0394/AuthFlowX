 
import '../styles/Home.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
 

function Home() {
 const { user } = useSelector((state) => state.auth) 
 
  return (
    <div className="home-wrapper">
      <div className="home-card">
        <h1>Welcome, {user?.name || "Guest"}!</h1>

        <p>Please login or register to access your dashboard</p>
        <div className="home-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Home