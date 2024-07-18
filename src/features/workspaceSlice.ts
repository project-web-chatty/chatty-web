import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import logo_coupang from "../assets/logo/logo_coupang.png";
import logo_toss from "../assets/logo/logo_toss.png";

interface Workspace {
  icon: string;
  text: string;
  route?: string;
}

interface WorkspaceState {
  workspaces: Workspace[];
}

const initialState: WorkspaceState = {
  workspaces: [
    { icon: logo_coupang, text: "쿠팡", route: "/workspace/coupang" },
    { icon: logo_toss, text: "토스팀", route: "/workspace/toss" },
  ],
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
