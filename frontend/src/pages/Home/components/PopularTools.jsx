 import React, { useEffect, useState } from "react";
 
import api from "../../../api/axios";
import "./PopularTools.css"
 
 

function PopularTools() {

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
  const fetchPopularTools = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/popular");
      console.log("Popular tools API data:", data); // debug
      if (data.success) setTools(data.tools);
    } catch (err) {
      console.error(err);
      setError("Failed to load popular tools.");
    } finally {
      setLoading(false);
    }
  };
  fetchPopularTools();
}, []);


  if (loading) return <p className="loading" style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p className="loading error" style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
   <section className="popular-tools">
  <div className="popular-header">
    <h2>Popular Tools</h2>
    <p>Most used AI tools by the community</p>
  </div>

  <div className="tools-grid">
    {tools.length > 0 ? (
      tools.map((tool) => (
        <a
          key={tool._id}
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="tool-card text-only"
        >
          <h3 className="tool-name">{tool.name}</h3>
        </a>
      ))
    ) : (
      <p className="no-tools">No popular tools found.</p>
    )}
  </div>
</section>


  )
}

export default PopularTools