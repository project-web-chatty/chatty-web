export interface channel {
  createdDate: string;
  lastModifiedDate: string;
  id: number;
  name: string;
}

export interface Message {
  id: number | null;
  channelId: number;
  senderNickname: string;
  senderUsername: string;
  content: string;
  regDate: any;
}
