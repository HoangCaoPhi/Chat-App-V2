import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentShareService {

  constructor() { }

  private _getConversationId: BehaviorSubject<string>  = new BehaviorSubject<string>('');
  getConversationId$: Observable<string> = this._getConversationId.asObservable();

   setConversationId(convId: string) {
     this._getConversationId.next(convId);
   }
  // Nhận ID khi có sự kiện thay đổi user
  @Output() userId = new EventEmitter<string>();
  changeUser(id: string) {
    this.userId.emit(id);
  }
}
