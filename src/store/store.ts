import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "../features/workspaceSlice";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";

const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
