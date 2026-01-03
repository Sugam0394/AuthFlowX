import { createSlice } from "@reduxjs/toolkit";
import {  createAsyncThunk } from "@reduxjs/toolkit";
 import { fetchAdminStats } from "../../api/adminApi";


 
export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchAdminStats();
      // 👇 IMPORTANT: sirf stats return karo
      return res.stats;
    } catch (err) {
      return rejectWithValue(
        err?.message || "Dashboard fetch failed"
      );
    }
  }
);


/* ---------- initial state ---------- */



const initialState = {
  admin: null,        // admin info
  isAuthenticated: false,

  dashboard: {
    stats: {
      totalUsers: 0,
      totalTools: 0,
      totalReviews: 0,
    },
    loading: false,
    error: null,
  },

};




/* ---------- slice ---------- */

 const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
    },
    clearAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.dashboard.loading = true;
        state.dashboard.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.dashboard.loading = false;
        state.dashboard.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.dashboard.loading = false;
        state.dashboard.error = action.payload;
      });
  },
});



export const { setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;