import { Chat } from "../../types/chat";
import { Get } from "../util/apiUtils";

const chatService = {
  getMessages: async (channelId: number, currentPage: number) => {
    const response = await Get<Chat>(
      `chat/${channelId}?currentPage=${currentPage}`
    );
    return response.data.result;
  },

  searchLastReadMessageId: async (channelId: number) => {
    const response = await Get(`chat/${channelId}/read/id`);

    return response.data.result;
  },

  getLastMessage: async (channelId: number) => {
    const response = await Get(`chat/${channelId}/last`);

    return response.data.result;
  },

  getUnreadMessageCount: async (channelId: number) => {
    const response = await Get<number>(`chat/${channelId}/count`);

    return response.data.result;
  },
};

export const {
  getMessages,
  searchLastReadMessageId,
  getLastMessage,
  getUnreadMessageCount,
} = chatService;
