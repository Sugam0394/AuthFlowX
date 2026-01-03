import React from 'react'
import "./ToolsGrid.css"
import {useNavigate}from 'react-router-dom'
import ToolCard from './ToolCard'
 

function ToolsGrid({ tools = [] }) {
    const navigate = useNavigate();

  if (!Array.isArray(tools) || tools.length === 0) {
    return (
      <p style={{ textAlign: "center", opacity: 0.6 }}>
        No tools found
      </p>
    );
  }
  return (
       <div className="tools-grid">
      {tools.map((tool) => (
        <ToolCard
          key={tool._id}
          tool={tool}
          onClick={(id) => navigate(`/tools/${id}`)}
        />
      ))}
    </div>
  )
}

export default ToolsGrid