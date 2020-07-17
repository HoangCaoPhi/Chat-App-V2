import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ComponentShareService } from '@app/services/component-share.service';
import { User } from '@app/models';
import { StringeeService } from '@app/services/stringee/stringee.service';
import { UserService } from '@app/services/user/user.service';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})

export class ListComponent implements OnInit {
  responseConvs: any; // cuộc trò chuyện được trả về 
  convId: string; // Id của cuộc trò chuyện
  convIdFromDataTranfer: string; // Id conversation lấy từ route
  tabTranfer: number = 0; // Chỉ định hiển thị cuộc trò chuyện hay danh bạ
  users: User[]; // danh sách người dùng lấy từ server
  UserId: any = JSON.parse(localStorage.getItem("currentUser")).id; // id của người dùng 

  constructor(
    private route: ActivatedRoute,
    private componentShareService: ComponentShareService,
    private stringeeService: StringeeService,
    private _userservice: UserService
  ) {
    route.params.subscribe(val => {
      // Nhận param của contact-detail gửi đến
      this.getParam();
      this.stringeeService.stringeeClient.on('connect', () => {
        this.stringeeService.realTimeUpdate();
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
  // Tạo một cuộc trò chuyện mới
  onCreateConversation(user: User) {
    this.stringeeService.creaateConversationService(user, (status: string, code: string, message: string, conv: any) => {
        localStorage.setItem("convId", conv.id);
        this.componentShareService.setConversationId(conv.id);
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


  /*======================================================= XỬ LÝ GIAO DIỆN ===================================================================*/
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

  tabConv: number;
  tabCont: number;
  // Chuyển về tab conversation
  getConversationsTab() {
    this.tabConv = 1;
    this.tabTranfer = 0;
    this.getConversationLast();
  }
  // Chuyển về tab danh bạ
  getContactListTab() {
    this.tabCont = 1;
    this.tabTranfer = 1;

    this._userservice.getUser()
      .pipe(
        map(data => data.filter(data => data.id !== this.UserId))
      ).subscribe(
        data => { this.users = data }
      )
  }

}
