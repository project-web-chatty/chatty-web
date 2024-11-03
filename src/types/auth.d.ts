import { CommonResponse } from "./common";

export interface RequestLoginParams {
  username: string;
  password: string;
}

export interface ResponseLogin extends CommonResponse {
  accessToken: string;
  refreshToken: string;
}
