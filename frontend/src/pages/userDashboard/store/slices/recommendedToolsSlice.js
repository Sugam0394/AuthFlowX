import api from "../../../../api/axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// api call


export const fetchRecommendedTools = createAsyncThunk(
  "recommendedTools/fetch",
  async (field, thunkAPI) => {
    try {
      const res = await api.get(`/recommeded?field=${field}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
    }
  }
);

const recommendedToolsSlice = createSlice({
  name: "recommendedTools",
  initialState: {
    tools: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendedTools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedTools.fulfilled, (state, action) => {
        state.loading = false;
        state.tools = action.payload;
      })
      .addCase(fetchRecommendedTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recommendedToolsSlice.reducer;