// 🔹 Set accessToken
export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

// 🔹 Get accessToken
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// 🔹 Clear accessToken
export const clearAccessToken = () => {
  localStorage.removeItem("accessToken");
};
