import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ComponentShareService } from '@app/services/component-share.service';
import { Chat } from '../../models/chat';
import { ChatService } from '../../services/chat.service';
import { User } from '@app/models';
import { MessageService } from '@app/services/stringee/message.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})

export class ListComponent implements OnInit {
  user: User[];
  filterUsers: User[] = [];
  idParam: number;

  constructor(
    private chatService: ChatService, private route: ActivatedRoute, private componentShareService: ComponentShareService, private messageService: MessageService) {
    // Nhận id của contact-detail gửi đến
    this.getParam();
  }

  ngOnInit(): void {
     this.getConvesation();
  }

  /*
          Lấy các cuộc trò chuyện
   */
  getConvesation() {
    this.chatService.getUser().subscribe(
      (getChats) => {
        this.user = getChats;
        console.log(getChats);
        this.filterUsers = this.user;
      }
    )
  }
  /*
        Sắp xếp cuộc trò chuyện theo thời gian gửi sau cùng 
  */
  // get sortCoversation() {
  //   return this.filterUsers.sort((a, b) => {
  //     return <any>new Date(b.lastTime) - <any>new Date(a.lastTime);
  //   });
  // }
  /* 
        Them class vao DOM khi seen tin nhắn
  */

  // Thay doi trang thái khi xem tin nhắn
  seenMesseage(chat: User) {
    // chat.seenStatus = 0;
    // chat.amoutNewMesseage = 0;
    // this.messageService.creaateConversation(chat);
  }
  onCick(user: User) {
    this.messageService.creaateConversation(user);
  }
 // Focus hộp thoại hiện tại
  getActive(chat) {
    if (chat.id === this.userId) {
      this.seenMesseage(chat);
    }
    return {
      'selected': chat.id === this.userId
    }
  }
  /*
        Lấy id và active thanh những cuộc trò chuyện
  */
  userId: number;

  valueFromChildSubscription: Subscription;
  getParam() {
    this.valueFromChildSubscription = this.componentShareService.ValueFromChild.subscribe(
      data => {
        this.userId = data;
        // console.log("This is a conversation id" + this.userId);
      }
    );
  }
  ngOnDestroy() {
    this.valueFromChildSubscription.unsubscribe();
  }
  /* Xử lý date 
  */

  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor(
      (Date.UTC(currentDate.getFullYear(),
        currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(),
          dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }
  /*
       return 0 tra ve giờ
       return 1 trả về thứ
       return 2 trả về ngày
   */
  caculateLastTime(time) {
    let timeSub = this.calculateDiff(time);
    if (timeSub <= 1) {
      return 0;
    }
    else if (timeSub > 1 && timeSub <= 8) {
      return 1;
    }
    else if (timeSub > 8) {
      return 2;
    }
  }
}
