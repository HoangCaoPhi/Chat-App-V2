import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ComponentShareService } from '@app/services/component-share.service';
import { User } from '@app/models';
import { StringeeService } from '@app/services/stringee/stringee.service';
import { UserService } from '@app/services/user/user.service';
import { filter, map } from 'rxjs/operators';
import { UserIdTranferService } from '@app/services/user-tranfer.service';


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
  tabChange: boolean; // active tab
  responseLastMsg: any;

  constructor(
    private route: ActivatedRoute,
    private componentShareService: ComponentShareService,
    private userIdTranferService: UserIdTranferService,
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

  /* #region  XỬ LÝ STRINGEE  */
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
    });
  }

  /* #region  TRANFER SERVICE  */

  //Truyền conversation id sang cho list 
  onCickConversation(conv: any) {
    // Lay id cua user
    for (let con of this.responseConvs) {
      if (con.id == conv.id) {
        let nameConv = con.participants.filter(p => p.userId != this.UserId);
        // Lấy thông tin của user id và truyền sang cho conv detail
        this.stringeeService.getUserInfo(nameConv[0].userId, (status, code, msg, users) => {
            this._userservice.getUserFromId(users[0].userId).subscribe(user => this.userIdTranferService.setUser(user));
        })
      }
    }
    this.componentShareService.setConversationId(conv.id);
  }
  getConvesationLast() {
    console.log("Detail run")
    this.stringeeService.stringeeServiceMessage(this.convIdFromDataTranfer, (status, code, message, msgs) => {
      this.responseLastMsg = msgs;
      console.log(msgs)
    });
  }
  // Conversation id được nhận từ conversation detail
  getParam() {
    this.componentShareService.getConversationId$.subscribe(convId => { this.convIdFromDataTranfer = convId });

  }
  test() {

  }

  /* #region  XỬ LÝ GIAO DIỆN  */
  
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

  // Chuyển về tab conversation
  getConversationsTab() {
    this.tabTranfer = 0;
    this.getConversationLast();
    this.tabChange = false;
  }
  // Chuyển về tab danh bạ
  getContactListTab() {
    this.tabTranfer = 1;
    this.tabChange = true;
    // Lấy danh sách user từ backend
    this._userservice.getUser()
      .pipe(
        map(data => data.filter(data => data.id !== this.UserId)) // Loại bỏ người dùng hiện tại trong danh sách
      ).subscribe( 
        data => { this.users = data }
      )
  }
}
