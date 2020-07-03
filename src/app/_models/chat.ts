import { Messeage } from "./messeage";
export interface Chat {
    id: number;
    name: string;
    lastMesseage: string;
    avt: string;
    lastTime: Date;
    amoutNewMesseage: number;
    seenStatus: number,
    isActive ?: boolean,
    phone?:string;
    email?:string;
    listMesseage: Messeage[];
  }
  