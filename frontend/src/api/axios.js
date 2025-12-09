import axios from 'axios'
import { showError } from '../utils/toast'
 
 
 


 
 
const api = axios.create({
  baseURL: "http://localhost:3000", 
  withCredentials: true, // cookies allowed
})

 // Lazy store access using import()
api.interceptors.request.use(async (config) => {
  try {
    const { default: store } = await import('../app/store')
    const token = store.getState().auth.accessToken
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch (err) {
    console.error('Error accessing store in axios:', err)
  }
  return config
})
 

// handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    showError(message);

    return Promise.reject(error);
  }
);
 

 

export default api