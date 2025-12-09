import React ,  { useState } from "react"
import {useDispatch, useSelector} from 'react-redux'
 
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import { loginUser } from "../features/auth/authSlice"
 
 


function Login() {
 
 const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault()
  const resultAction = await dispatch(loginUser(formData))

  if (loginUser.fulfilled.match(resultAction)) {
    // Token is already set in axios interceptor
    navigate("/dashboard") // dashboard opens now
  }
}






  return (
       <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error-msg">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}

export default Login