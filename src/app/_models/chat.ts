import { Messeage } from "./messeage";
export interface Chat {
    id: number;
    name: string;
    lastMesseage: string;
    avt: string;
    lastTime: string;
    notSeen: number;
    phone?:string;
    email?:string;
    listMesseage: Messeage[];
  }
  