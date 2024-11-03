import { ResponseUserInfo } from "./user.d";

export interface ResponseWorkspace {
  createdDate: string;
  lastModifiedDate: string;
  id: number;
  name: string;
  profileImg?: string;
  description: string;
  members: ResponseUserInfo[];
  channels: Channel[];
}

export interface Channel {
  createdDate: string;
  lastModifiedDate: string;
  id: number;
  name: string;
  unreadCount: number; //0으로 초기화
}

export interface RequestCreateWorkspaceParams {
  name: string;
  description: string;
  file: string;
}
