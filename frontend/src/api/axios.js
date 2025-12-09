import axios from 'axios'
import { showError } from '../utils/toast'

import store from '../app/store.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true, // cookies allowed
})

// Auto attach accessToken from Redux
api.interceptors.request.use((config) => {
  const token = store.getState().user.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

 // Response interceptor with toast & 401 handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong'
    showError(message) // toast error

    // Handle 401
    if (error.response?.status === 401) {
      console.log('Unauthorized, logging out...')
      // store.dispatch(logout())  // uncomment if logout action exists
      // window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)
 

 

export default api