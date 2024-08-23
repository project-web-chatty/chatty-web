import { CommonResponse } from "./common.d";
import { ResponseWorkspace } from "./workspace.d";

export interface User extends CommonResponse {
  id: number;
  username: string;
  email?: string;
  role: string;
  profileImg?: string;
  nickname: string;
  introduction: string;
  myWorkspaces: [ResponseWorkspace];
  createdDate: string;
  lastModifiedDate: string;
}
