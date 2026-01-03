import React from 'react'
import "./ToolCard.css"

function ToolCard({ tool, onClick }) {

 const avgRating = tool.reviews?.length
    ? (
        tool.reviews.reduce((sum, r) => sum + r.rating, 0) /
        tool.reviews.length
      ).toFixed(1)
    : "0.0";
    
  return (
      <div
      className="tool-card"
      onClick={() => onClick(tool._id)}
      role="button"
      tabIndex={0}
    >
      {/* App Logo */}
      <img
        src={tool.logo}
        alt={tool.name}
        className="tool-logo"
      />

      {/* Tool Name */}
      <h3 className="tool-name">{tool.name}</h3>

      {/* Rating */}
      <span className="tool-rating">⭐ {avgRating}</span>
    </div>
  )
}

export default ToolCard