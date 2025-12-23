 import React, {useState} from 'react'
 import { useNavigate } from 'react-router-dom'
 import {loginAdmin} from '../../api/adminApi'
 import { setAccessToken } from '../../utils/auth'
 import { useDispatch } from 'react-redux'
 import './login.css'
 
 import { setAdmin} from '../../app/adminSlice/adminSlice'
 

 
 function Adminlogin() {
  
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

   try {
  const res = await loginAdmin({ email, password });

  const { accessToken, admin } = res.data;

  if (!accessToken || !admin || admin.role !== "admin") {
    throw new Error("Admin login failed");
  }

  setAccessToken(accessToken);
  dispatch(setAdmin(admin));
  navigate("/admin/dashboard");

} catch (err) {
  console.error(err);
  setError("Invalid admin credentials");

} finally {
  setLoading(false);
}





 }

return (


 <div className="login-container">
  <div className='login-card'> 
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2  >Admin Login</h2>

        {error && <p  >{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <button
          type="submit"
          
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  </div>


   )
 }
 
 export default Adminlogin