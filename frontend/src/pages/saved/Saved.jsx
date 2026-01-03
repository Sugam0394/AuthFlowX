import React from 'react'
import ToolsGrid from '../userDashboard/components/ToolGrid'
import "./Saved.css"

function Saved() {

    const savedTools = [];







  return (
      <div className="page-wrapper">
      <h1 className="page-title">Saved Tools</h1>

      {savedTools.length === 0 ? (
        <p style={{ opacity: 0.6 }}>
          You haven’t saved any tools yet ❤️
        </p>
      ) : (
        <ToolsGrid tools={savedTools} />
      )}
    </div>
  )
}

 






export default Saved


 
