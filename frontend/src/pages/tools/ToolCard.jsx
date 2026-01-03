import React from "react";
import "./ToolCard.css";

function ToolCard({ tool }) {
  return (
    <div className="tool-card">
      <img
        src={tool.logo}
        alt={tool.name}
        className="tool-logo"
      />

      <h3 className="tool-name">{tool.name}</h3>

      <span className="tool-rating">
        ⭐ {tool.rating || "4.5"}
      </span>

      <a
        href={tool.website}
        target="_blank"
        rel="noopener noreferrer"
        className="tool-open"
      >
        Open →
      </a>
    </div>
  );
}

export default ToolCard;
