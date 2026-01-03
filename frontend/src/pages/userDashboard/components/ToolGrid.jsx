 import React from "react";
import { useNavigate } from "react-router-dom";
import "./ToolsGrid.css";
 import ToolCard from "./ToolCard";

function ToolsGrid({ tools = [] }) {
  const navigate = useNavigate();

  if (!tools.length) {
    return <p className="empty-text">No tools found</p>;
  }

  return (
    <div className="tools-grid">
      {tools.map((tool) => (
        <ToolCard
          key={tool._id}
          tool={tool}
          onClick={() => navigate(`/tools/${tool._id}`)}
        />
      ))}
    </div>
  );
}

export default ToolsGrid;

