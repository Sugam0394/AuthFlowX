 // src/app/api/toolsApi.js
 
import api from "../api/axios";


 import { setToolsStart , setPagination, setToolsFailure , setToolsSuccess, approveToolSuccess , deleteToolSuccess , rejectToolSuccess} from '../app/toolSlice/toolsSlice'

// get all tools by admin 
export const fetchAllTools = (page = 1, limit = 20) => async (dispatch) => {
  try {
    dispatch(setToolsStart());

    const token = localStorage.getItem("adminToken");

    const res = await api.get(
      `/admin/tools?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      console.log("API Response:", res.data);  // ✅ Check

    /*
      Expected response:
      {
        tools: [...],
        page: 1,
        totalPages: 5,
        totalTools: 100
      }
    */

    dispatch(setToolsSuccess(res.data.tools));

    dispatch(
      setPagination({
        page: res.data.page,
        totalPages: res.data.totalPages,
        totalTools: res.data.totalTools,
      })
    );
  } catch (error) {
    dispatch(
      setToolsFailure(
        error.response?.data?.message || "Failed to fetch tools"
      )
    );
  }
};



// Approve tool
export const approveTool = (id) => async (dispatch) => {
  try {
    await api.patch(`/admin/approveTool/${id}`);
    dispatch(approveToolSuccess({ _id: id }));
  } catch (error) {
    console.error("Approve tool failed", error);
  }
};

// Delete tool
export const deleteTool = (id) => async (dispatch) => {
  try {
    await api.delete(`/deleteTool/${id}`);
    dispatch(deleteToolSuccess({ _id: id }));
  } catch (error) {
    console.error("Delete tool failed", error);
  }
};

// Reject tool
export const rejectTool = (id) => async (dispatch) => {
  try {
    await api.patch(`/admin/rejectTool/${id}`);
    dispatch(rejectToolSuccess({ _id: id }));
  } catch (error) {
    console.error("Reject tool failed", error);
  }
};





 




