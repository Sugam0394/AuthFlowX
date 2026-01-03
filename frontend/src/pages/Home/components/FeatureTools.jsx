 import React, { useEffect, useState } from "react";
 
 import "./FeaturedTools.css";
 import ToolCard from '../ToolCard/ToolCard';
 import api from "../../../api/axios";

function FeatureTools() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/featured");
        setTools(data);
      } catch (err) {
        setError("Failed to load featured tools.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);
 
    

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  

  return (
      <section className="featured-tools">
      <div className="featured-header">
        <h2>Featured AI Tools</h2>
        <p>Handpicked tools for maximum productivity</p>
      </div>

      <div className="tools-grid">
        {tools.length === 0 ? (
          <p style={{ textAlign: "center" }}>No tools found.</p>
        ) : (
          tools.map((tool) => (
            <ToolCard
              key={tool._id}
              name={tool.name}
              description={tool.description}
              tags={[tool.isPopular ? "Popular" : "Free"]}
              featured={tool.isFeatured || false}
              logo={tool.logo}
              url={tool.url}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default FeatureTools