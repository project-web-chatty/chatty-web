import { Get } from "../util/apiUtils";

const chatService = {
  getMessages: async (channelId: number) => {
    const response = await Get(`chat/${channelId}`);

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
    const response = await Get(`chat/${channelId}/count`);

    return response.data.result;
  },
};

export const {
  getMessages,
  searchLastReadMessageId,
  getLastMessage,
  getUnreadMessageCount,
} = chatService;
