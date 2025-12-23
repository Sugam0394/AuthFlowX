// utils/roleAuth.js
export const setUserRole = (role) => localStorage.setItem("userRole", role);
export const getUserRole = () => localStorage.getItem("userRole");
export const removeUserRole = () => localStorage.removeItem("userRole");
