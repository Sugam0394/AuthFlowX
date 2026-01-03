 import React from 'react'
 import "./Categories.css"
 
 function Categories() {
   return (
   <section className="home-explore">
  <h2>Explore the AI Universe</h2>
  <p>Thousands of tools across every category — curated for you</p>

  <div className="category-chips">
    <span>🤖 Productivity</span>
    <span>🎨 Design</span>
    <span>✍️ Writing</span>
    <span>📊 Marketing</span>
    <span>🎬 Video</span>
    <span>🔍 Research</span>
  </div>

  <div className="explore-actions">
    <a href="/register" className="explore-btn">
      Explore All Tools →
    </a>

    <p className="login-hint">
      Login to unlock saved tools, recommendations & reviews
    </p>
  </div>
</section>

   )
 }
 
 export default Categories