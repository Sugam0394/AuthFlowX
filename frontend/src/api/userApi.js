import api from "./axios";


// Get logged in User
export const fetchUserProfile = async () => {
  const  { data } = await api.get('/user/profile')
  return data
}


// update Profile
export const updateUserProfile = async (userData) => {
  const { data } = await api.put('/user/profile', userData)
  return data
}

