import React from 'react'
import { useNavigate } from 'react-router-dom'
 
import { registerUser } from '../../api/authApi'
 
import { useState } from 'react'

import './register.css'



 
 
 function Register() {


 const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');


   try {
  const data = await registerUser(formData);

  // ✅ Only success check
  if (data?.statusCode === 201) {
    navigate('/login');
  }

} catch (err) {
  setError(err?.message || 'Registration failed');
} finally {
  setLoading(false);
}
  }


   return (
    <div className='register-container'>
     <div className='register-card'>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
    </div>
   )
 }
 
 export default Register


 
 