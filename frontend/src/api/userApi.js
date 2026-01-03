import api from "./axios";

export const getCurrentUser = async () => {
    try {
         const res = await api.get("/auth/me");
    return res.data.user;
    } catch (error) {
         console.log("User Profile Error" , error)
    }
}


export const selectUserField = (field) => {
     return api.post('/auth/select-field' , { field })
}
 


 