import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { ChatService } from './chat.service';
import { Chat } from '../_models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatDetailService implements Resolve<Chat> {

  constructor(private cs: ChatService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Chat> | Observable<never> {
    let id = +route.paramMap.get('id');

    return this.cs.getChat(id).pipe(
      take(1),
      mergeMap(chat => {
        if (chat) {
          return of(chat);
        } else { // id not found
          this.router.navigate(['/chat']);
          return EMPTY;
        }
      })
    );
  }
}