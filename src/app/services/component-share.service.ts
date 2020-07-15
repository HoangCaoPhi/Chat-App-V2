import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentShareService {

  constructor() { }

  private getConversationId = new Subject<any>();

  // Trả về conversationId nhận được
  public get ValueFromChild() {
    return this.getConversationId;
  }
  // Nhận vào conversationId được emit lên
  public notifyCountValue(number) {
    this.getConversationId.next(number);
  }
}
