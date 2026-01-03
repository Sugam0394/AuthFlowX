 import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
 import adminReducer from './adminSlice/adminSlice'
 import toolsReducer from './toolSlice/toolsSlice';
 import reviewReducer from './reviewSlice/';
 import userToolsReducer from './ToolReduxSlice';
 import recommendedToolsReducer from '../pages/userDashboard/store/slices/recommendedToolsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    tools: toolsReducer,
    reviews: reviewReducer,
    userTools: userToolsReducer,
    recommendedTools: recommendedToolsReducer
  },
});

export default store;
