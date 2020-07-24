import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ComponentShareService } from '@app/services/component-share.service';
import { User } from '@app/models';
import { StringeeService } from '@app/services/stringee/stringee.service';
import { UserService } from '@app/services/user/user.service';
import { filter, map } from 'rxjs/operators';
import { UserIdTranferService } from '@app/services/user-tranfer.service';
import { AuthenticationService } from '@app/services/authentication.service';


@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})

export class ListComponent implements OnInit {
  //#region  Field
  @Input() responseConvs: any; // cuộc trò chuyện được trả về 
  convId: string; // Id của cuộc trò chuyện
  convIdFromDataTranfer: string; // Id conversation lấy từ route
  tabTranfer: number = 0; // Chỉ định hiển thị cuộc trò chuyện hay danh bạ
  users: User[]; // danh sách người dùng lấy từ server
  UserId: any = JSON.parse(localStorage.getItem("currentUser")).id; // id của người dùng 
  tabChange: boolean; // active tab
  selectContact: string;
  searchTerm: string;
  //#endregion

  //#region  Contructor
  constructor(
    private route: ActivatedRoute,
    private componentShareService: ComponentShareService,
    private userIdTranferService: UserIdTranferService,
    private stringeeService: StringeeService,
    private _userservice: UserService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    route.params.subscribe(val => {
      this.convId = this.route.snapshot.paramMap.get('id');
      // this.onCickConversation(this.convId);
      this.getParam();
 
    });
  }
  ngOnInit(): void { }
  //#endregion

  //#region  Stringee Handle
  /**
   * Lấy ra tất cả các cuộc trò chuyện
   */
  getConversationLast() {
    this.stringeeService.stringeeServiceConversation((status, code, message, convs) => {
      this.responseConvs = convs;
      //lấy thông tin conversation đầu tiên
      if (convs) {
        for (let con of this.responseConvs) {
          if (con.id == this.convId) {
            con.unreadCount = 0;
            this.stringeeService.stringeeChat.markConversationAsRead(con);
            for (let parti of con.participants) {
              if (parti.userId != this.UserId) {
                // Nếu người dùng đã đăng nhập
               // if (this.authenticationService.currentUserValue) {
                  //this.router.navigate(['/chat/' + convs[0].id]);
                  // Lấy thông tin của user
                  this.stringeeService.getUserInfo(parti.userId, (status, code, msg, users) => {
                    // Truyền thông tin user cho detail
                    this._userservice.getUserFromId(users[0].userId).subscribe(user => {
                      this.userIdTranferService.setUser(user)
                    });
                  })
                // }
                break;
              }
            }
          }
        }
      }
    });
  }
  /**
   * Tạo một cuộc trò chuyện mới
   * @param user Thông tin của user để tạo cuộc trò chuyện
   */
  onCreateConversation(user: User) {
    this.stringeeService.creaateConversationService(user, (status: string, code: string, message: string, conv: any) => {
      localStorage.setItem("convId", conv.id);
      this.router.navigate(['/chat/' + conv.id]);
      this.getConversationsTab();
    });
  }
  //#endregion

  //#region  Tranfer Data
  /**
   * Truyền thông tin user từ cuộc trò chuyện sang tin nhắn chi tiết của từng cuộc trò chuyện
   * @param conv Cuộc trò chuyện mà người dùng click vào
   */
  onCickConversation(conv: any) {
    conv.unreadCount = 0;
    for (let con of this.responseConvs) {
      if (con.id == conv.id) {
        let nameConv = con.participants.filter(p => p.userId != this.UserId);
        this.stringeeService.getUserInfo(nameConv[0].userId, (status, code, msg, users) => {
          this._userservice.getUserFromId(users[0].userId).subscribe(user => this.userIdTranferService.setUser(user));
        })
      }
    }
    this.stringeeService.stringeeChat.markConversationAsRead(this.convId)
  }

  /**
   * Conversation id được nhận được từ route để active cuộc trò chuyện
   */
  getParam() {
    this.componentShareService.getConversationId$.subscribe(convId => { this.getConversationLast() });
  }
  //#endregion

  //#region  Handle Front
  seenMesseage(chat: User) { }

  /**
   * Active cuộc trò chuyện khi người dùng click
   * @param conv 
   */
  getActive(conv) {
    if (conv.id === this.convId) {
      this.seenMesseage(conv);
    }
    return {
      'selected': conv.id === this.convId
    }
  }
  /**
   *  Chuyện sang xem cuộc trò chuyện
   */
  getConversationsTab() {
    this.tabTranfer = 0;
    this.getConversationLast();
    this.tabChange = false;
  }
  /**
   * Chuyện sang xem danh sách các người dùng
   */
  getContactListTab() {
    this.tabTranfer = 1;
    this.tabChange = true;
    // Lấy danh sách user từ backend
    this._userservice.getUser()
      .pipe(
        map(data => data.filter(data => data.id !== this.UserId)) // Loại bỏ người dùng hiện tại trong danh sách
      ).subscribe(
        data => { 
          this.users = data;
          this.userResource = data 
        }
      )
  }
  /**
   * Định dạng các loại sẽ hiển thị giờ theo ngày, tuần hay giờ
   * @param data Thời gian được truyền vào
   */
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
  /**
   * Tính toán khoảng cách của thời gian hiện tại và thời gian gửi tin nhắn cuối cùng
   * @param data 
   */
  calculateDiff(data: number) {
    let currentDate = new Date();
    let timeSent = new Date(data);
    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(timeSent.getFullYear(), timeSent.getMonth(), timeSent.getDate())) / (1000 * 60 * 60 * 24));
  }

  public userResource = []; // Dữ liệu lưu để so sánh
  search(): void {
    let term   = this.searchTerm.toLowerCase();
    this.users = this.userResource.filter(function(tag) {
      return tag.userName.toLowerCase().indexOf(term) >= 0;
  }); 
  }
  //#endregion
}
