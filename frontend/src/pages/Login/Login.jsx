 import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../api/authApi'
 import { setUser } from '../../app/slices/authSlice'
 import { setAccessToken } from '../../utils/auth'
 import './login.css'
 

function Login() {
 


    const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

try {
  const res = await loginUser(formData);

  console.log("LOGIN RESPONSE 👉", res);

  const accessToken = res?.data?.accessToken;
  const user = res?.data?.user;

  if (!accessToken || !user) {
    throw new Error("Invalid login response");
  }

  setAccessToken(accessToken);
 
  dispatch(setUser(user));

 // Role-based redirect
if (user.role === "user") {
  navigate("/dashboard");
} else {
  navigate("/login");
}

} catch (err) {
  console.error(err);
  setError("Invalid email or password");
} finally {
    setLoading(false);
  }
}
  return (
    <div className='login-container'>
    <div className='login-card'>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
    </div>

)
}


export default Login 