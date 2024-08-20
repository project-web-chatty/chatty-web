import { CommonResponse } from "./common.d";
import { ResponseWorkspace } from "./workspace.d";

export interface ResponseUserInfo extends CommonResponse {
  createdDate: string;
  lastModifiedDate: string;
  id: number;
  username: string;
  email?: string;
  role: string;
  profile_img?: string;
  nickname: string;
  introduction: string;
  myWorkspaces: [ResponseWorkspace];
}
