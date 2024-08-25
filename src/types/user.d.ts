import { CommonResponse } from "./common.d";
import { ResponseWorkspace } from "./workspace.d";

export interface User extends CommonResponse {
  id: number;
  username: string;
  email?: string;
  role: string;
  workspaceRole: "ROLE_WORKSPACE_MEMBER" | "ROLE_WORKSPACE_OWNER";
  profileImg?: string;
  nickname: string;
  introduction: string;
  myWorkspaces: [ResponseWorkspace];
  createdDate: string;
  lastModifiedDate: string;
}
