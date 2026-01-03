 import api from "./axios";

 // 🔐 Admin Login
export const loginAdmin = async (Data) => {
  try {
    const response = await api.post("/admin/login", Data);
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || "Admin login failed";
  }
};

// 🔓 Admin Logout
export const logoutAdmin = async () => {
  try {
    const response = await api.post("/admin/logout");
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || "Admin logout failed";
  }
};

export const fetchAdminStats = async () => {
  try {
    const response = await api.get("/admin/stats");
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || "Fetching admin stats failed";
}
};

