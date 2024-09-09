import { Put } from "./../util/apiUtils";
import { Delete, Get, Post } from "../util/apiUtils";
import { ResponseWorkspace } from "../../types/workspace";
import { User } from "../../types/user";
import { channel } from "./../../types/channel.d";

const workSpaceService = {
  /**
   * API to get detailed user information"
   * @param
   * @returns
   */
  getUserInfo: async () => {
    const response = await Get<User>("/me");

    return response.data.result;
  },

  /**
   * API to update user's profile-img"
   * @param
   * @returns
   */
  updateUserProfileImg: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await Post(`/me/profile-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },

  /**
   * API to update user info
   * @param name
   * @param nickname
   * @param introduction
   *
   */
  updateUserInfo: async (updatedData: {
    name?: string;
    nickname?: string;
    introduction?: string;
  }) => {
    if (updatedData) {
      const response = await Put(`/me`, updatedData);

      return response;
    }
  },

  /**
   * API to leave workspace"
   * @param workspaceId
   * @returns
   */
  leaveWorkspace: async (workspaceId: number) => {
    const response = await Delete(`/me/workspaces/${workspaceId}`);

    if (response.data.isSuccess) {
      return response;
    } else {
      console.log(response.data.message);
    }
  },
};

export const {
  getUserInfo,
  updateUserProfileImg,
  leaveWorkspace,
  updateUserInfo,
} = workSpaceService;
