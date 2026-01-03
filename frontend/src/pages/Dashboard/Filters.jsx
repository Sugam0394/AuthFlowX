import React from 'react'
import { useState, useEffect } from 'react';
import './Filters.css'
 

function Filters( { search, setSearch, category, setCategory } ) {


    const [allCategories, setAllCategories] = useState([]);

   // Fetch categories from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/category")

      .then(res => res.json())
      .then(data => setAllCategories(data))
      .catch(err => console.log(err));
  }, []);

 
 

 











  return (
  
       <div className="filters-card">

      {/* Row 1: Search input */}
      <div className="filters-row search-row">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Row 2: Categories balloons + Clear button */}
      <div className="filters-row categories-row">
        <div className="categories-tags">
          {allCategories.map((cat, index) => (
            <button
              key={index}
              className={`category-tag ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          className="clear-btn"
          onClick={() => {
            setSearch("");
            setCategory("");
          }}
        >
          Clear
        </button>
      </div>

    </div>

  )
}

export default Filters