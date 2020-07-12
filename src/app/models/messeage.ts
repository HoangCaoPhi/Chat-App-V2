export interface Messeage {
    id: number;
    senderID ?: number;
    content: string;
    time: Date;
    type ?: string;
    typeofFile ?: string;
    url ?: string;
    fromMe: boolean;
  }
  