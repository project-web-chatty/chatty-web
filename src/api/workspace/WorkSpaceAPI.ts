import { Put } from "./../util/apiUtils";
import { Delete, Get, Post } from "../util/apiUtils";
import { ResponseWorkspace } from "../../types/workspace";
import { User } from "../../types/user";
import { channel } from "./../../types/channel.d";

const workSpaceService = {
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

  updateWorkspaceDescription: async (
    workspaceId: number,
    description: string
  ) => {
    const response = await Put(`/workspace/${workspaceId}`, {
      description: description,
    });

    return response;
  },

  updateWorkspaceProfileImg: async (workspaceId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await Post(
      `/workspace/${workspaceId}/profile-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  },

  getWorkspaceInvitationLink: async (workspaceId: number) => {
    const response = await Get(`/workspace/${workspaceId}/invite`);

    return response.data.result as string;
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

  getWorkspaceMembers: async (workspaceId: number) => {
    const response = await Get(`/workspace/${workspaceId}/members`);

    if (response.data.isSuccess) {
      return response.data.result as User[];
    } else {
      console.log(response.data.message);
    }
  },

  /**
   * API to delete member (Only owner)
   * @param workspaceId
   * @param memberId
   * @returns
   */
  deleteMember: async (workspaceId: number, memberId: number) => {
    const response = await Delete(
      `/workspace/${workspaceId}/members/${memberId}`
    );

    if (response.data.isSuccess) {
      return response;
    } else {
      console.log(response.data.message);
    }
  },
};

export const {
  getWorkspaceInfo,
  getWorkspaceChannels,
  createChannel,
  createWorkspace,
  joinWorkspace,
  deleteWorkspace,
  updateWorkspaceDescription,
  updateWorkspaceProfileImg,
  getWorkspaceInvitationLink,
  getWorkspaceMembers,
  deleteMember,
} = workSpaceService;
