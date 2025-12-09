import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserProfile } from '../api/userApi'
import { setLoading, setError } from '../features/user/userSlice'
import LogoutButton from '../components/LogoutButton'
import "../styles/Dashboard.css"

function Dashboard() {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.user)

  useEffect(() => {
    const loadProfile = async () => {
      dispatch(setLoading(true))
      try {
        await dispatch(fetchUserProfile()).unwrap()
      } catch (err) {
        dispatch(setError(err.message || "Failed to fetch profile"))
      } finally {
        dispatch(setLoading(false))
      }
    }

    loadProfile()
  }, [dispatch])

  if (loading) return <p>Loading profile...</p>
  if (error) return <p className="error">Error: {error}</p>

  // Dummy data for frontend testing if user is null
  const displayUser = user || { name: "Sugam Singh", email: "sugam@example.com" };

  return (
      <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <h2>Welcome, {displayUser.name}!</h2>
        <p>Email: {displayUser.email}</p>
        <LogoutButton />
      </div>
    </div>   
  )
}

export default Dashboard