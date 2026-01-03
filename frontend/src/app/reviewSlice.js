import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchAllReviews, approveReview, deleteReview , rejectReview } from "../api/reviewApi";

/* ================================
   THUNKS
================================ */

// Get all reviews (admin)
export const getAllReviewsThunk = createAsyncThunk(
  "reviews/getAll",
  async (status, { rejectWithValue }) => {
    try {
      return await fetchAllReviews(status);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Approve review
export const approveReviewThunk = createAsyncThunk(
  "reviews/approve",
  async (reviewId, { rejectWithValue }) => {
    try {
      return await approveReview(reviewId);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Reject review
export const rejectReviewThunk = createAsyncThunk(
  "reviews/reject",
  async (reviewId, { rejectWithValue }) => {
    try {
      return await rejectReview(reviewId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// Delete review
export const deleteReviewThunk = createAsyncThunk(
  "reviews/delete",
  async (reviewId, { rejectWithValue }) => {
    try {
      await deleteReview(reviewId);
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    
  },

   reducers: {},

  extraReducers: (builder) => {
    builder

      // GET ALL REVIEWS
      .addCase(getAllReviewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getAllReviewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


        // APPROVE REVIEW
      .addCase(approveReviewThunk.fulfilled, (state, action) => {
        const updated = action.payload.data;
        const index = state.reviews.findIndex(
          (r) => r._id === updated._id
        );
        if (index !== -1) {
          state.reviews[index] = updated;
        }
      })



        // REJECT REVIEW
      .addCase(rejectReviewThunk.fulfilled, (state, action) => {
        const updated = action.payload.data;
        const index = state.reviews.findIndex(
          (r) => r._id === updated._id
        );
        if (index !== -1) {
          state.reviews[index] = updated;
        }
      })



           // DELETE REVIEW
      .addCase(deleteReviewThunk.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (r) => r._id !== action.payload
        );
      });
  },
});


export default reviewSlice.reducer;