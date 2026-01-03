 // src/app/slices/toolsSlice.js
import { createSlice } from "@reduxjs/toolkit";
 

const initialState = {
  tools: [],
  loading: false,
  error: null,
  
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setToolsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setToolsSuccess: (state, action) => {
      state.loading = false;
      state.tools = action.payload;
     
    },
    setToolsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
     approveToolSuccess: (state, action) => {
    const index = state.tools.findIndex(t => t._id === action.payload._id);
    if (index !== -1) state.tools[index].status = "approved";
  },
    rejectToolSuccess: (state, action) => {
      const index = state.tools.findIndex(t => t._id === action.payload._id);
      if (index !== -1) state.tools[index].status = "rejected";
    },



  deleteToolSuccess: (state, action) => {
    state.tools = state.tools.filter(t => t._id !== action.payload._id);
  },
    setPagination: (state, action) => {
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages
    },
  },
});

export const {
  setToolsStart,
  setToolsSuccess,
  setToolsFailure,
  approveToolSuccess,
  deleteToolSuccess,
    rejectToolSuccess,
  setPagination
} = toolsSlice.actions;

export default toolsSlice.reducer;
