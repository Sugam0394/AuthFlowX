 import api from "./axios";
 



export const registerUser = async (formData) => {
  try {
    const response = await api.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

// 🔐 Login API
export const loginUser = async (formData) => {
  try {
    const response = await api.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};


 export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error?.message || "Logout failed";
  }
};
 