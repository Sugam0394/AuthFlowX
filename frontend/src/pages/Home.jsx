import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const { user } = useSelector((state) => state.auth)
  return (
    <div className="home-container">
      <h2>Welcome, {user?.name || "Guest"}!</h2>
      {user ? (
        <p>You are logged in. Go to your dashboard for more features.</p>
      ) : (
        <p>Please login or register to access your dashboard.</p>
      )}
    </div>
  )
}

export default Home