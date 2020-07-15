import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ComponentShareService } from '@app/services/component-share.service';
import { User } from '@app/models';
import { StringeeService } from '@app/services/stringee/stringee.service';
 

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})

export class ListComponent implements OnInit {
  filterUsers: User[] = [];
  responseConvs: any; // cuộc trò chuyện được trả về 
  convId: string; // Id của cuộc trò chuyện
  convIdTranfer: number; // Id conversation lấy từ route

  constructor(
  private route: ActivatedRoute, private componentShareService: ComponentShareService, private stringeeService: StringeeService) {
          // Nhận param của contact-detail gửi đến
          this.getParam();
          this.getConversationLast();
    }

  ngOnInit(): void {}

  /*======================================================= XỬ LÝ STRINGEE ===================================================================*/ 
   /*
      Lấy những cuộc trò chuyện trả về cho responseConvs để render 
   */
  async getConversationLast() {
      this.responseConvs =  await this.stringeeService.getLastConversations();
  }

  /* 
        Truyền conversation id sang cho list 
  */
  onCickConversation(conv: any) {
      this.componentShareService.notifyCountValue(conv.id);
  }

/*======================================================= END XỬ LÝ STRINGEE ===================================================================*/ 


  /*
        Thay doi trang thái khi xem tin nhắn
  */ 
  seenMesseage(chat: User) {
    
  }
  /* 
        Active cuộc trò chuyện khi click
  */
  getActive(conv) {
    if (conv.id === this.convIdTranfer) {
      this.seenMesseage(conv);
    }
    return {
      'selected': conv.id === this.convIdTranfer
    }
  }
  /*
     Lấy convId router lấy từ conversation-detail đẩy sang
  */


  valueFromChildSubscription: Subscription;
  getParam() {
    this.valueFromChildSubscription = this.componentShareService.ValueFromChild.subscribe(
      data => {
        this.convIdTranfer = data;
      }
    );
  }

  ngOnDestroy() {
    this.valueFromChildSubscription.unsubscribe();
  }
}
