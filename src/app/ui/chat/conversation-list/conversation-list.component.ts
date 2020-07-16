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
  responseConvs: any; // cuộc trò chuyện được trả về 
  convId: string; // Id của cuộc trò chuyện
  convIdFromDataTranfer: string; // Id conversation lấy từ route

  constructor(
    private route: ActivatedRoute, private componentShareService: ComponentShareService, private stringeeService: StringeeService) {
    route.params.subscribe(val => {
    // Nhận param của contact-detail gửi đến
      this.getParam();
      this.stringeeService.stringeeClient.on('connect', () => {
        this.getConversationLast();
      })
    });
  }
  ngOnInit(): void { }
  /*======================================================== XỬ LÝ STRINGEE =====================================================================*/
   //  Lấy những cuộc trò chuyện trả về cho responseConvs để render 
  getConversationLast() {
    this.stringeeService.stringeeServiceConversation((status, code, message, convs) => {
      this.responseConvs = convs;
    });
  }

/*=======================================================  TRANFER SERVICE ====================================================================== */
  //Truyền conversation id sang cho list 
  onCickConversation(conv: any) {
    this.componentShareService.setConversationId(conv.id);
  }
  // Conversation id được nhận từ conversation detail
  getParam() {
    this.componentShareService.getConversationId$.subscribe(convId => this.convIdFromDataTranfer = convId);
  }


  /*======================================================= END XỬ LÝ STRINGEE ===================================================================*/
  seenMesseage(chat: User) { }
  // Active cuộc trò chuyện khi click
  getActive(conv) {
    if (conv.id === this.convIdFromDataTranfer) {
      this.seenMesseage(conv);
    }
    return {
      'selected': conv.id === this.convIdFromDataTranfer
    }
  }

  
}
