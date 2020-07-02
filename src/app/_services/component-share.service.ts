import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentShareService {

  constructor() { }

  private getConversationId = new Subject<any>();

  public get ValueFromChild() {
    return this.getConversationId;
  }
  public notifyCountValue(number) {
    this.getConversationId.next(number);
  }
}
