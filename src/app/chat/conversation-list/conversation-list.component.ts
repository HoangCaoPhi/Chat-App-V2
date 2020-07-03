import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ComponentShareService } from '@app/services/component-share.service';
import { Chat } from '../../_models/chat';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})

export class ListComponent implements OnInit {
  chats: Chat[];
  filterChats: Chat[] = [];
  checkActive: number = 0;
  idParam: number;

  constructor(private chatService: ChatService, private route: ActivatedRoute, private componentShareService: ComponentShareService) {
    this.getParam();
  }

  ngOnInit(): void {
    this.getConvesation();
    this.calculateDiff('Thursday 2020-07-02 10:00:00');
  }
  /*
      Chức năng filter cuộc trò chuyện 
  */
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

  /*
          Lấy các cuộc trò chuyện
   */
  getConvesation() {
    this.chatService.getInfo().subscribe(
      (getChats) => {
        this.chats = getChats;
        this.filterChats = this.chats;
      }
    )
  }
  /* 
        Them class vao DOM khi seen tin nhắn
  */
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

  seenMesseage(chat) {
    chat.seenStatus = 0;
    chat.amoutNewMesseage = 0;
    this.checkActive = 1;

    this.getSeen(chat);
    this.getAmoutNewMesseage(chat);
  }

  getActive(chat) {
    if (chat.id === this.count) {
      this.seenMesseage(chat);
    }
    return {
      'selected': chat.id === this.count
    }
  }
  /*
        Lấy id và active thanh những cuộc trò chuyện
  */
  count: number;

  valueFromChildSubscription: Subscription;
  getParam() {
    this.valueFromChildSubscription = this.componentShareService.ValueFromChild.subscribe(
      data => {
        this.count = data;
        console.log("This is a conversation id" + this.count);
      }
    );
  }
  ngOnDestroy() {
    this.valueFromChildSubscription.unsubscribe();
  }
  /* Xử lý date 
  */

 calculateDiff(dateSent){
  let currentDate = new Date();
  dateSent = new Date(dateSent);

  return Math.floor(
    (Date.UTC(currentDate.getFullYear(), 
     currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), 
     dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
 }
 /*
      return 0 tra ve giờ
      return 1 trả về thứ
      return 2 trả về ngày
  */
 caculateLastTime(time) {
   let timeSub = this.calculateDiff(time);
   if(timeSub <= 1) {
      return 0;
   }
   else if(timeSub => 1 && timeSub <= 8) {
      return 1;
   }
   else if(timeSub => 8) {
      return 2;
   }

 }
}
