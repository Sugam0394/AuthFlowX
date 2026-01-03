import React, { useState } from "react";
import api from "../../api/axios";
import "./ToolReviews.css";
import { useEffect } from "react";

function ToolReviews({ toolId, reviews, }) {
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);


const [myReview, setMyReview] = useState(null);
const [isEditing, setIsEditing] = useState(false);

useEffect(() => {
  const fetchMyReview = async () => {
    try {
      const { data } = await api.get(`/my/${toolId}`);
      if (data.data) {
        setMyReview(data.data);
        setReviewText(data.data.comment);
        setReviewRating(data.data.rating);
        setIsEditing(true);
      }
    } catch (error) {
       console.log("Error fetching user's review:", error);
    }
  };

  fetchMyReview();
}, [toolId]);





 const handleSubmitReview = async (e) => {
  e.preventDefault();

  if (!reviewText || reviewRating === 0) {
    alert("Please add review and rating");
    return;
  }

  try {
    setSubmitting(true);

    let res;

    if (isEditing && myReview?._id) {
      // 🔄 UPDATE
      res = await api.put(`/update/${myReview._id}`, {
        comment: reviewText,
        rating: reviewRating,
      });

      alert("Review updated and pending approval");
    } else {
      // 🆕 CREATE
      res = await api.post("/create", {
        toolId,
        comment: reviewText,
        rating: reviewRating,
      });

      alert("Review submitted and pending admin approval");
    }

    // reset state (user ka review pending hai, public me nahi dikhega)
    setMyReview(res.data.data);
    setIsEditing(true);
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  } finally {
    setSubmitting(false);
  }
};

  // ✅ Safe reviews array
  const safeReviews = Array.isArray(reviews) ? reviews : [];



  return (
    <div className="tool-reviews-container">
      {/* Review Form */}
      <div className="review-form">
        <h3>{isEditing ? "Update Your Review" : "Add Your Review"}</h3>
        {myReview && (
          <p className="review-status">
            Status: <strong>{myReview.status}</strong>
          </p>
        )}
        <form onSubmit={handleSubmitReview}>
          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className="star-rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= reviewRating ? "star filled" : "star"}
                onClick={() => setReviewRating(star)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <button type="submit" disabled={submitting}>
            {submitting
              ? "Submitting..."
              : isEditing
              ? "Update Review"
              : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      {safeReviews.length > 0 && (
        <div className="reviews-list">
          <h3>Reviews:</h3>
          <ul>
            {safeReviews
              .filter((review) => review && review._id)
              .map((review) => (
                <li key={review._id} className="review-item">
                  <div className="review-text">
                    {review.comment || "No comment"}
                  </div>
                  <div className="review-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= (review.rating || 0) ? "star filled" : "star"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {review.user?.name && (
                    <p className="review-author">By: {review.user.name}</p>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ToolReviews;
