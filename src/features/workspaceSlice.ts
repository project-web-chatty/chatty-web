import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface Workspace {
  profileImg: string;
  name: string;
  id: number;
}

interface WorkspaceState {
  workspaces: Workspace[];
}

const initialState: WorkspaceState = {
  workspaces: [],
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    addWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.workspaces = [...state.workspaces, action.payload];
    },
    reset: () => initialState,
  },
});

export const { addWorkspace, reset } = workspaceSlice.actions;
export default workspaceSlice.reducer;
