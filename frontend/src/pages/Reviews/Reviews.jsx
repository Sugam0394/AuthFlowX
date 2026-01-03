 import React, { useEffect, useState } from "react";
import { getAllReviewsThunk , approveReviewThunk , rejectReviewThunk , deleteReviewThunk} from "../../app/reviewSlice"

import { useDispatch, useSelector } from "react-redux";
import "./Reviews.css";

function Reviews() {


const dispatch = useDispatch();



 const { reviews , loading, error,  } = useSelector(
  (state) => state.reviews
);


     const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(getAllReviewsThunk(statusFilter));
  }, [dispatch, statusFilter]);

  const handleApprove = (id) => {
    dispatch(approveReviewThunk(id));
    
  };

  const handleReject = (id) => {
    dispatch(rejectReviewThunk(id));
  };

     const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReviewThunk(id));
    }
  };

  return (
      
      <div className="admin-page">
      <h2>Review Moderation</h2>

      {/* Filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{ marginBottom: "15px" }}
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      {loading && <p>Loading reviews...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && reviews.length === 0 && (
        <p>No reviews found.</p>
      )}

      {!loading && reviews.length > 0 && (
        <table width="100%" border="1" cellPadding="10">
          <thead>
            <tr>
              <th>User</th>
              <th>Tool</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.user?.name}</td>
                <td>{review.tool?.name}</td>
                <td>{review.rating} ⭐</td>
                <td>{review.comment || "-"}</td>
                <td>
                  <span
                     className={`status-badge status-${review.status}`}
                  >
                    {review.status}
                  </span>
                </td>
                <td>
                  {review.status === "pending" && (
                    <>
                      <button className="btn-approve"
                     
                        onClick={() => handleApprove(review._id)}
                        style={{ marginRight: "6px" }}
                      >
                        Approve
                      </button>
                      <button className="btn-reject"
                        onClick={() => handleReject(review._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button className="btn-delete"
                    onClick={() => handleDelete(review._id)}
                    style={{ marginLeft: "6px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    )
}

export default Reviews