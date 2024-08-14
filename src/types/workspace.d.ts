import { ResponseUserInfo } from "./user.d";

export interface ResponseWorkspace {
  createdDate: string;
  lastModifiedDate: string;
  id: number;
  name: string;
  profile_img?: string;
  description: string;
  members: ResponseUserInfo[];
  channels: Channel[];
}

export interface Channel {
  createdDate: string;
  lastModifiedDate: string;
  id: number;
  name: string;
}

export interface RequestCreateWorkspaceParams {
  name: string;
  description: string;
}
