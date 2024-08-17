import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      state.workspaces.push(action.payload);
    },
  },
});

export const { addWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
