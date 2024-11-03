export interface Message {
  id: string | null;
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
