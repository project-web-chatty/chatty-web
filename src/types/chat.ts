export interface Message {
  id: number | null;
  channelId: number;
  senderNickname: string;
  senderUsername: string;
  content: string;
  regDate: any;
}
