export interface ChatItem {
  name: string;
  avatar: string;
  text: string;
  isSent: boolean;
  stamp: string;
  otherData: {
    isRead?: boolean;
    vipLevel: number;
  };
}
