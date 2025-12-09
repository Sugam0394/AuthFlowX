import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserProfile } from '../api/userApi'
import { setLoading, setError } from '../features/user/userSlice'
import LogoutButton from '../components/LogoutButton'

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

  return (
        <div className="dashboard-container">
      <h2>Welcome, {user?.name || "User"}!</h2>
      <p>Email: {user?.email}</p>
      <LogoutButton /> {/* ✅ Logout button yahan add karo */}
    </div>
  )
}

export default Dashboard