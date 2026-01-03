 import React, { useState } from "react";
import "./ToolCard.css";

function ToolCard({ tool, onClick }) {
  const [saved, setSaved] = useState(false);

  const avgRating = tool.reviews?.length
    ? (
        tool.reviews.reduce((sum, r) => sum + r.rating, 0) /
        tool.reviews.length
      ).toFixed(1)
    : "0.0";

  const handleSave = (e) => {
    e.stopPropagation(); // important
    setSaved(!saved);
  };

  return (
    <div className="tool-card" onClick={onClick}>
      {/* Save Button */}
      <button
        className={`save-btn ${saved ? "saved" : ""}`}
        onClick={handleSave}
      >
        {saved ? "❤️" : "🤍"}
      </button>

      <img src={tool.logo} alt={tool.name} className="tool-logo" />

      <h3 className="tool-name">{tool.name}</h3>

      <p className="tool-tagline">
        {tool.tagline || "AI tool to boost productivity"}
      </p>

      <div className="tool-footer">
        <span className="tool-rating">⭐ {avgRating}</span>
        <span className="tool-price">{tool.pricing || "Free"}</span>
      </div>
    </div>
  );
}

export default ToolCard;

