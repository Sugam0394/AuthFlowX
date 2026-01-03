import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import api from "../api/axios";




// thunk for fetchin tools with filters and pagination


export const fetchAllToolsByUser = createAsyncThunk(
  "tools/fetchAll",
  async ({ page = 1, search = "", category = "", limit = 20 }, { rejectWithValue }) => {
    try {
        const query = `?page=${page}&limit=${limit}${search ? `&search=${search}` : ""}${category ? `&category=${category}` : ""}`;
      const { data } = await api.get(`/tools${query}`);
      console.log("THUNK PAYLOAD:", data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const toolsSlice = createSlice({
  name: "userTools",
  initialState: {
    tools: [],
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
    search: "",
    category: "",
  },
  reducers: {
    setSearch: (state, action) => { state.search = action.payload; },
    setCategory: (state, action) => { state.category = action.payload; },
  },
   extraReducers: (builder) => {
  builder
    .addCase(fetchAllToolsByUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
     .addCase(fetchAllToolsByUser.fulfilled, (state, action) => {
        state.loading = false;

        state.tools = action.payload?.tools || [];
        state.page = Number(action.payload?.page) || 1;
        state.totalPages = Number(action.payload?.totalPages) || 1;
      })
    
     
    .addCase(fetchAllToolsByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}

});

export const { setSearch, setCategory } = toolsSlice.actions;
export default toolsSlice.reducer;


