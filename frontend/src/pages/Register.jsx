import React, {useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
 import { registerUser } from '../features/auth/authSlice'
 import { useNavigate } from 'react-router-dom'

function Register() {


  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

    const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser(formData));

    if (registerUser.fulfilled.match(result)) {
      navigate("/login"); // success redirect
    }
  };

  return (
      <div className="register-container">
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  )
}

export default Register