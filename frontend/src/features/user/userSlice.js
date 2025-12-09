import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
  user: null,
  accessToken: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user , accessToken } = action.payload
      state.user = user
      state.accessToken = accessToken
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setCredentials, logout, setLoading, setError } = userSlice.actions
export default userSlice.reducer
