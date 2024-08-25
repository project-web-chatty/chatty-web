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

export const { getUserInfo, leaveWorkspace } = workSpaceService;
