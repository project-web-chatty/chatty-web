import { Get, Post } from "../util/apiUtils";
import { ResponseUserInfo } from "../../types/user";
import {
  RequestCreateWorkspaceParams,
  ResponseWorkspace,
} from "../../types/workspace";

const postOption = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
};

const workSpaceService = {
  /**
   * API to get detailed user information"
   * @param
   * @returns
   */
  getUserInfo: async () => {
    const response = await Get<ResponseUserInfo>("/me", postOption);

    return response.data.result;
  },

  /**
   * API to get user's workspaces information
   * @param
   * @returns
   */
  getWorkspaceInfo: async (id: number) => {
    const response = await Get<ResponseWorkspace>(
      `/workspace/${id}`,
      postOption
    );
  },

  /**
   * API to create a new workspace
   * @param
   * @returns
   */
  createWorkspace: async (data: RequestCreateWorkspaceParams) => {
    const response = await Post("/workspace", data, postOption);
    return response;
  },

  /**
   * API to join another user's workspace
   * @param
   * @returns
   */
  joinWorkspace: async (code: string) => {
    const response = await Post(`/workspace/join/${code}`, "", postOption);

    if (response.data.isSuccess) {
      return response;
    } else {
      if (response.data.message === "해당 초대코드는 유효하지 않습니다.") {
        // 유효하지 않다는 모달 띄우기
      } else if (
        response.data.message === "해당 멤버는 워크스페이스에 이미 존재합니다."
      ) {
        // 논의 필요
      }
    }
  },
};

export const { getUserInfo, getWorkspaceInfo, createWorkspace, joinWorkspace } =
  workSpaceService;
