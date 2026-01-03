import React from 'react'
import "./Pagination.css"

function Pagination( {  page = 1 , totalPages= 1 , onPageChange  } ) {

 

   if (!totalPages || totalPages <= 1) {
    return null; // pagination hi mat dikhao
  }

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }


  return (
       <div className="pagination-container">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="pagination-btn"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`pagination-btn ${p === page ? "active" : ""}`}
        >
          {p}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination