import React from 'react'
import api from '../../api/axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import "./ToolDetails.css"
import ToolReviews from './ToolReviews';
 

function ToolDetails() {
 
  const { id } = useParams(); // URL se tool id
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reviews, setReviews] = useState([]);

  


 











  useEffect(() => {
    const fetchTool = async () => {
      try {
        const { data } = await api.get(`/tools/${id}`);
        setTool({ ...data.tool, reviews: data.tool.reviews || [] });

        setReviews(data.tool.reviews || []); // ✅ IMPORTANT
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [id]);

   if (loading) return <p className="loading">Loading tool details...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!tool) return <p className="not-found">Tool not found</p>;

 // Conditional badge colors
  const statusClass =
    tool.status.toLowerCase() === "live"
      ? "badge-live"
      : "badge-inactive";

 
  return (
        <div className="tool-details-container">

      {/* Tool Header */}
      <div className="tool-header">
        <h1 className="tool-name">{tool.name}</h1>
        <span className={`tool-status ${statusClass}`}>{tool.status}</span>
      </div>

      {/* Tool Info */}
      <div className="tool-info">
        <p><strong>Category:</strong> {tool.category}</p>
        <p><strong>Target Audience:</strong> {tool.targetAudience}</p>
        <p><strong>Pricing:</strong> {tool.pricing}</p>
        <p><strong>Description:</strong> {tool.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="tool-actions">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="visit-button"
        >
          Visit Tool
        </a>

        <button
          className="copy-url-button"
          onClick={() => {
            navigator.clipboard.writeText(tool.url);
            alert("Tool URL copied to clipboard!");
          }}
        >
          Copy Tool URL
        </button>
      </div>

       <ToolReviews
  toolId={id}
  reviews={reviews}
  setReviews={setReviews}
/>
</div>



     
      )
}
  


export default ToolDetails