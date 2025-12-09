import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice.js'
import authReducer from '../features/auth/authSlice.js'

const store = configureStore({
    reducer:{
        user: userReducer,
        auth: authReducer,
    },

     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
})

export default store
