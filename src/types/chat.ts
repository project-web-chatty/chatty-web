export interface Message {
  id: number | null;
  channelId: number;
  senderNickname: string;
  senderProfileImg: string;
  workspaceJoinId: number;
  content: string;
  regDate: any;
}

export interface Chat {
  messageResponseDtoList: Message[];
  havePoint: boolean;
  last: boolean;
}
