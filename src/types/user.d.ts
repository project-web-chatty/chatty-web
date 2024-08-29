import { CommonResponse } from "./common.d";
import { ResponseWorkspace } from "./workspace.d";

export interface User extends CommonResponse {
  id: number;
  username: string;
  email?: string;
  role: string;
  workspaceRole: "ROLE_WORKSPACE_MEMBER" | "ROLE_WORKSPACE_OWNER"; // (워크스페이스 페이지에 들어갔을 때) 해당 워크스페이스에서 역할
  profileImg?: string;
  nickname: string;
  introduction: string;
  myWorkspaces: [ResponseWorkspace];
  createdDate: string;
  lastModifiedDate: string;
  joinDate?: string; // (워크스페이스 페이지에 들어갔을 때) 해당 워크스페이스에 가입한 날짜
}
