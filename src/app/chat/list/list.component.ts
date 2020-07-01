import { Component, OnInit } from '@angular/core';

import { Chat } from '../../_models/chat';
import { ChatService } from '../../_services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  chats: Chat[];
  filterChats: Chat[] = [];
  checkActive: number = 0;
  idParam: number;

  constructor(private chatService: ChatService, private route: ActivatedRoute,) {

  }

  _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filterChats = this.listFilter ? this.performFilter(this.listFilter) : this.chats;
    console.log(`This is list chat = ${JSON.stringify(this.filterChats)}`);
  }

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();

    return this.chats.filter((chat: any) =>
      chat.name.toLocaleLowerCase().indexOf(filterBy) > -1);
  }

  ngOnInit(): void {
    this.chatService.getInfo().subscribe(
      (getChats) => {
        this.chats = getChats;
        this.filterChats = this.chats;
      }
    )
    this.idParam = +this.route.snapshot.firstChild.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.idParam)}`);
  }

  // ngClass
  getSeen(chat) {
    return {
      'seen': !chat.seenStatus,
      'not-seen': chat.seenStatus
    }
  }
  getAmoutNewMesseage(chat) {
    return {
      'not-amout': chat.amoutNewMesseage === 0
    }
  }
  getActive(chat) {
    return {
      'selected': this.checkActive === 1 && chat.id === this.idParam
    }
  }
  seenMesseage(chat) {
    chat.seenStatus = 0;
    chat.amoutNewMesseage = 0;
    this.checkActive = 1;

    this.getSeen(chat);
    this.getAmoutNewMesseage(chat);
    this.getActive(chat);
  }


}
