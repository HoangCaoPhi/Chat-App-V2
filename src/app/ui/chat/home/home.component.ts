import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from '@app/models/chat';
import { StringeeService } from '@app/services/stringee/stringee.service';
import { UserService } from '@app/services/user/user.service';
import { UserIdTranferService } from '@app/services/user-tranfer.service';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: any; // User hiện tại
  responseLastMsg: any; // Dữ liệu các tin nhắn được trả về
  responseConvs: any; // Dữ liệu các convs được trả về
  userShareService: any; // Thông tin người dùng để truyền qua các component con
  convId: any; // Id cuộc trò chuyện
  UserId: any = JSON.parse(localStorage.getItem("currentUser")).id; // id của người dùng 
  showAboutRight: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private stringeeService: StringeeService,
    private userIdTranfer: UserIdTranferService,
    private _userservice: UserService,
    private userIdTranferService: UserIdTranferService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

    route.params.subscribe(val => {
      this.stringeeService.stringeeClient.on('connect', () => {
        console.log("connect")
        this.stringeeService.authenListners();
        this.stringeeService.realTimeUpdate();
        this.stringeeService.getAndUpdateInfo();
        this.getConversationLast();
        this.getMessageLast(val.id);
    
      })
      this.getMessageLast(val.id);
      this.convId = val.id;
      this.getUserIdTranfer();
    });
  }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.stringeeService.connectStringee(this.currentUser.token); // connect Stringee
   
  }
  // Lấy thông tin cuộc trò chuyện và các tin nhắn tương ứng
  getConversationLast() {
    console.log("getConversationLast")
    this.stringeeService.stringeeServiceConversation((status, code, message, convs) => {
      this.responseConvs = convs; console.log(this.responseConvs)

      //lấy conversation đầu tiên
      for (let parti of convs[0].participants) {
        if (parti.userId != this.UserId) {

          if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/chat/' + convs[0].id]);
            this.stringeeService.getUserInfo(parti.userId, (status, code, msg, users) => {
              this._userservice.getUserFromId(users[0].userId).subscribe(user => {
                this.userShareService = user
              });
              // this._userservice.getUserFromId(users[0].userId).subscribe(user => this.userIdTranferService.setUser(user));
            })
          }
          break;
        }
      }
      for (let con of this.responseConvs) {
        if (con.id == this.convId) {
          let nameConv = con.participants.filter(p => p.userId != this.UserId);
          // Lấy thông tin của user id và truyền sang cho conv detail
          this.stringeeService.getUserInfo(nameConv[0].userId, (status, code, msg, users) => {
            this._userservice.getUserFromId(users[0].userId).subscribe(user => {
              this.userShareService = user
            });
            // this._userservice.getUserFromId(users[0].userId).subscribe(user => this.userIdTranferService.setUser(user));
          })
        }
        break;
      }

    });
  }
  // Lấy tin nhắn của cuộc trò chuyện
  getMessageLast(convId) {
    this.stringeeService.stringeeServiceMessage(convId, (status, code, message, msgs) => {
      this.responseLastMsg = msgs;
      console.log(msgs);
    });
  }
  // Nhận user từ conversation list chuyển sang
  getUserIdTranfer() {
    this.userIdTranfer.getUser$.subscribe(user => { this.userShareService = user });
  }
  //   Ẩn hay Hiển thị phần thông tin tin nhắn
  toggleInfo() {
    this.showAboutRight = !this.showAboutRight;
  }
}
