import api from "./axios";



// Register new User

export const registerUser = async(data) => {
    const { data: resData}  = await api.post('/auth/register', data)
    return resData
}


// Login User
export const loginUser = async (data) => {
    const {data: resData}  = await api.post('/auth/login' , data)
    return resData
}


// Logout user
export const logoutUser = async () => {
  const {data: resData} = await api.post('/auth/logout')
  return resData
}


