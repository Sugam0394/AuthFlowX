import { logoutUser } from "../api/authApi";
import { clearUser } from "../app/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { clearAccessToken } from "../utils/auth";
import { useDispatch } from "react-redux";

 


function useLogout() {

     const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await logoutUser(); // backend clear cookie/session
    } catch (error) {
       console.log("Logout err", error)
    }

    // 🔥 HARD RESET
    clearAccessToken();
    dispatch(clearUser());

    navigate("/");
  };


  return logout
}

export default useLogout