// userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserInfo } from "../api/user/UserAPI";
import { ResponseWorkspace } from "../types/workspace";

export interface UserState {
  id: number | null;
  username: string | null;
  email?: string | null;
  role: string | null;
  workspaceRole: "ROLE_WORKSPACE_OWNER" | "ROLE_WORKSPACE_MEMBER" | null;
  profileImg?: string | null;
  nickname: string | null;
  introduction: string | null;
  myWorkspaces: [ResponseWorkspace] | null;
  createdDate: string | null;
  lastModifiedDate: string | null;
  joinDate: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  role: null,
  workspaceRole: null,
  profileImg: null,
  nickname: null,
  introduction: null,
  myWorkspaces: null,
  createdDate: null,
  lastModifiedDate: null,
  joinDate: null,
  loading: false,
  error: null,
};

// 비동기 액션 정의
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, thunkAPI) => {
    try {
      const data = await getUserInfo();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch user info");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.id = null;
      state.username = null;
      state.email = null;
      state.role = null;
      state.workspaceRole = null;
      state.profileImg = null;
      state.nickname = null;
      state.introduction = null;
      state.myWorkspaces = null;
      state.createdDate = null;
      state.lastModifiedDate = null;
      state.joinDate = null;
      state.loading = false;
      state.error = null;
      // 기타 상태 초기화 로직
    },
    setRole: (state, action) => {
      state.workspaceRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.workspaceRole = action.payload.workspaceRole;
        state.profileImg = action.payload.profileImg;
        state.nickname = action.payload.nickname;
        state.introduction = action.payload.introduction;
        state.myWorkspaces = action.payload.myWorkspaces;
        state.createdDate = action.payload.createdDate;
        state.lastModifiedDate = action.payload.lastModifiedDate;
        state.loading = false;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser, setRole } = userSlice.actions;
export default userSlice.reducer;
