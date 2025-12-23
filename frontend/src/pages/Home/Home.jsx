import React from 'react'
import Navbar from '../../components/NavBar'
import './Home.css'

function Home() {
  return (
   <>
   <Navbar />
    <div className="home">
        <h1>Welcome to AI-Mart 🚀</h1>
        <p>
          AI-Mart is your one-stop platform to explore, compare and use the best
          AI tools for productivity, learning and growth.
        </p>

        <div className="features">
          <div className="card">
            <h3>🔍 Discover AI Tools</h3>
            <p>Find the right AI tool for your exact use-case.</p>
          </div>

          <div className="card">
            <h3>⚡ Save Time</h3>
            <p>No more searching everywhere — everything in one place.</p>
          </div>

          <div className="card">
            <h3>🎯 Built by Sugam</h3>
            <p>Made for learners, builders & creators.</p>
          </div>
        </div>
      </div>
   
   
   
   </>


  )
}

export default Home