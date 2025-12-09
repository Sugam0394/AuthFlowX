
 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
 
 import api from '../../api/axios'

  
 

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Register failed" });
    }
  }
);
 
// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/logout");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;

 
 