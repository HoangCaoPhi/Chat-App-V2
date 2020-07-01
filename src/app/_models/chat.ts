import { Messeage } from "./messeage";
export interface Chat {
    id: number;
    name: string;
    lastMesseage: string;
    avt: string;
    lastTime: string;
    amoutNewMesseage: number;
    seenStatus: number,
    phone?:string;
    email?:string;
    listMesseage: Messeage[];
  }
  