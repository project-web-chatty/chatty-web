import { Delete, Get, Post } from "../util/apiUtils";
import { ResponseWorkspace } from "../../types/workspace";
import { ResponseUserInfo } from "../../types/user";
import { channel } from "./../../types/channel.d";

const workSpaceService = {
  /**
   * API to get detailed user information"
   * @param
   * @returns
   */
  getUserInfo: async () => {
    const response = await Get<ResponseUserInfo>("/me");

    return response.data.result;
  },

  /**
   * API to get user's workspaces information
   * @param
   * @returns
   */
  getWorkspaceInfo: async (id: number) => {
    const response = await Get<ResponseWorkspace>(`/workspace/${id}`);

    return response.data.result;
  },

  /**
   * API to get user's workspaces information
   * @param
   * @returns
   */
  getWorkspaceChannels: async (workspaceId: number) => {
    const response = await Get<channel[]>(`/workspace/${workspaceId}/channels`);

    return response.data.result;
  },

  /**
   * API to create a new workspace
   * @param
   * @returns
   */
  createWorkspace: async (data: {
    name: string;
    description: string;
    file: File | null;
  }) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (!!data.file) formData.append("file", data.file);

    const response = await Post("/workspace", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },

  /**
   * API for adding a new channel in the workspace
   * @param workspaceId
   * @param channelName
   * @returns
   */
  createChannel: async (workspaceId: number, channelName: string) => {
    const response = await Post(`/workspace/${workspaceId}/channels`, {
      name: channelName,
    });

    return response;
  },

  /**
   * API to join another user's workspace
   * @param
   * @returns
   */
  joinWorkspace: async (code: string) => {
    const response = await Post(`/workspace/join/${code}`, "");

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

  /**
   * API to delete workspace (Only owner)
   * @param workspaceId
   * @returns
   */
  deleteWorkspace: async (workspaceId: number) => {
    const response = await Delete(`/workspace/${workspaceId}`);

    if (response.data.isSuccess) {
      return response;
    } else {
      console.log(response.data.message);
    }
  },
};

export const {
  getUserInfo,
  getWorkspaceInfo,
  getWorkspaceChannels,
  createChannel,
  createWorkspace,
  joinWorkspace,
  deleteWorkspace,
} = workSpaceService;
