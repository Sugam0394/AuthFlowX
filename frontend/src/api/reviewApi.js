 import api from '../api/axios'


// ---------------- ADMIN ----------------

// Get all reviews (filter by status)
 export const fetchAllReviews = async (status) => {
  try {
    const query = status ? `?status=${status}` : "";
    const res = await api.get(`/admin/reviews${query}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};



// Approve review
export const approveReview = async (reviewId) => {
  try {
    const res = await api.patch(`/admin/reviews/${reviewId}/approve`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Reject review
export const rejectReview = async (reviewId) => {
  try {
    const res = await api.patch(`/admin/reviews/${reviewId}/reject`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
  
 

// Delete review
export const deleteReview = async (reviewId) => {
  const res = await api.delete(`/admin/reviews/${reviewId}/delete`);
  return res.data;
};

// ---------------- PUBLIC ----------------

// Get approved reviews of a tool
export const fetchToolReviews = async (toolId) => {
  const res = await api.get(`/tool/${toolId}/reviews`);
  return res.data;
};