import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWorkspaceInfo } from "../api/workspace/WorkSpaceAPI";
import { ResponseUserInfo } from "../types/user";
import { Channel } from "../types/workspace";

interface WorkspaceState {
  id: number | null;
  name: string | null;
  profileImg?: string | null;
  description: string | null;
  members: ResponseUserInfo[] | null;
  channels: Channel[] | null;
  createdDate: string | null;
  lastModifiedDate: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: WorkspaceState = {
  id: null,
  name: null,
  profileImg: null,
  description: null,
  members: null,
  channels: null,
  createdDate: null,
  lastModifiedDate: null,
  loading: false,
  error: null,
};

// 비동기 액션 정의
export const fetchWorkspaceInfo = createAsyncThunk(
  "workspace/fetchWorkspaceInfo",
  async (workspaceId: number, thunkAPI) => {
    try {
      const data = await getWorkspaceInfo(workspaceId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch user info");
    }
  }
);

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    clearWorkspace(state) {
      state.id = null;
      state.name = null;
      state.profileImg = null;
      state.description = null;
      state.members = null;
      state.channels = null;
      state.createdDate = null;
      state.lastModifiedDate = null;
      state.loading = false;
      state.error = null;
      // 기타 상태 초기화 로직
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaceInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceInfo.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.profileImg = action.payload.profileImg;
        state.description = action.payload.description;
        state.members = action.payload.members;
        state.channels = action.payload.channels;
        state.createdDate = action.payload.createdDate;
        state.lastModifiedDate = action.payload.lastModifiedDate;
        state.loading = false;
      })
      .addCase(fetchWorkspaceInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
