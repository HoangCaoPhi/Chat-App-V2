export interface Messeage {
    id: number;
    senderID ?: number;
    content: string;
    time: string;
    type ?: string;
    url ?: string;
    fromMe: boolean;
  }
  