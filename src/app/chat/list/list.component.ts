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

  constructor(private chatService: ChatService, private route: ActivatedRoute,) {}

  // ===================== FILTER ==========================
  _keySearchFilter = '';

  get keySearchFilter(): string {
    return this._keySearchFilter;
  }

  set keySearchFilter(value: string) {
    this._keySearchFilter = value;
    this.filterChats = this.keySearchFilter ? this.performFilter(this.keySearchFilter) : this.chats;
    console.log(`This is list chat = ${JSON.stringify(this.filterChats)}`);
  }

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();

    return this.chats.filter((chat: any) =>
      chat.name.toLocaleLowerCase().indexOf(filterBy) > -1);
  }
 // ===================== FILTER ================

  ngOnInit(): void {
    this.getConvesation();
    // this.idParam = +this.route.snapshot.firstChild.paramMap.get('id');
    // console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.idParam)}`);
  }
  getConvesation() {
    this.chatService.getInfo().subscribe(
      (getChats) => {
        this.chats = getChats;
        this.filterChats = this.chats;
      }
    )
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
