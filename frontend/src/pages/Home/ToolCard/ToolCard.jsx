import React from "react";
 
import "./ToolCard.css";

function ToolCard ({  image , url , name }) {

return (
         <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="tool-card"
    >
      <img
        src={image || "/placeholder.png"}
        alt={name}
        className="tool-image"
      />
    </a>
  )
}

export default ToolCard;
