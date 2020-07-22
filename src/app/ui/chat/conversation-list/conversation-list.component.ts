import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  @Input() responseConvs: any; // cuộc trò chuyện được trả về 
  convId: string; // Id của cuộc trò chuyện
  convIdFromDataTranfer: string; // Id conversation lấy từ route
  tabTranfer: number = 0; // Chỉ định hiển thị cuộc trò chuyện hay danh bạ
  users: User[]; // danh sách người dùng lấy từ server
  UserId: any = JSON.parse(localStorage.getItem("currentUser")).id; // id của người dùng 
  tabChange: boolean; // active tab
  selectContact: string;
    

  constructor(
    private route: ActivatedRoute,
    private componentShareService: ComponentShareService,
    private userIdTranferService: UserIdTranferService,
    private stringeeService: StringeeService,
    private _userservice: UserService,
    private router: Router,
  ) {
  route.params.subscribe(val => {
        this.convId = this.route.snapshot.paramMap.get('id');
        this.getParam();
    });
  }
  ngOnInit(): void { }
  // Conversation id được nhận từ conversation detail
  getParam() {
    this.componentShareService.getConversationId$.subscribe(convId => {  this.getConversationLast() });

  }
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
      this.router.navigate(['/chat/' + conv.id])
    });
  }

  /* #region  TRANFER SERVICE  */

  //Truyền conversation id sang cho list 
  onCickConversation(conv: any) {
    // Lay id cua user
    //      Lấy thông tin của user id và truyền sang cho home
    for (let con of this.responseConvs) {
      if (con.id == conv.id) {
        let nameConv = con.participants.filter(p => p.userId != this.UserId);
   
        this.stringeeService.getUserInfo(nameConv[0].userId, (status, code, msg, users) => {
            this._userservice.getUserFromId(users[0].userId).subscribe(user => this.userIdTranferService.setUser(user));
        })
      }
    }
  }
  
 
  /* #region  XỬ LÝ GIAO DIỆN  */
  
  seenMesseage(chat: User) { }

  // Active cuộc trò chuyện khi click
  getActive(conv) {
    if (conv.id === this.convId) {
      this.seenMesseage(conv);
    }
    return {
      'selected': conv.id === this.convId
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
 
  forMatTime(data: number) {
    let diff = this.calculateDiff(data);
    if (diff < 1) {
      return 0;
    }
    else if (diff >= 1 && diff < 8) {
      return 1;
    }
    else {
      return 2;
    }
  }

 
  calculateDiff(data: number) {
    let currentDate = new Date();
    let timeSent = new Date(data);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(timeSent.getFullYear(), timeSent.getMonth(), timeSent.getDate())) / (1000 * 60 * 60 * 24));
  }
}
