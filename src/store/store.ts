import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "../features/workspaceSlice";

const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
