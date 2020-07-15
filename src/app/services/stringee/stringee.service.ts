import { Injectable } from '@angular/core';

import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
import { User } from '@app/models';

import * as jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class StringeeService {

  constructor() { }

  stringeeClient = new StringeeClient();
  stringeeChat = new StringeeChat(this.stringeeClient);

  // Hàm connect stringge
  connectStringee(ACCESS_TOKEN) {
    this.stringeeClient.connect(ACCESS_TOKEN);
  }
  // Hàm tạo cuộc trò truyện với một người khác
  creaateConversation(user: User) {
    var userIds = [user.id];
    var options = {
      isDistinct: false,
      isGroup: false
    };
    this.stringeeChat.createConversation(userIds, options, (status, code, message, conv) => {
      //   console.log('status:' + status + ' code:' + code + ' message:' + message + ' conv:' + JSON.stringify(conv));
      let convId = conv.id;
      localStorage.setItem("convId", convId);
    });
  }

  // Lắng nghe onconnect
  connectListners() {
    this.stringeeClient.on('connect', () => {
      let token = JSON.parse(localStorage.getItem('currentUser')).token;
      let decodeToken = jwt_decode(token);

      let userId = decodeToken["userId"];
      let username = decodeToken["userName"];
      let avatar = decodeToken["avt"];

      console.log('++++++++++++++ connected to StringeeServer');
      console.log("User Id la" + userId + "UserName" + username + "avatar" + avatar);

      this.stringeeChat.getUsersInfo([userId], (status, code, msg, users) => {
        let user = users[0];
        if (!user) {
          let updateUserData = {
            display_name: username,
            avatar_url: avatar,
            email: ""
          }
          this.updateUserInfo(updateUserData);
        }
      })

    });

  }

  // Lắng nghe authen
  authenListners() {
    this.stringeeClient.on('authen', function (res) {
      console.log('authen', res);
    });
  }

  // Lắng nghe disconnect
  disconnectListners() {
    this.stringeeClient.on('disconnect', function () {
      console.log('++++++++++++++ disconnected');
    });
  }

  // Hàm gửi tin nhắn dạng text
  sendTextMessage(YOUR_CONVERSATION_ID: string, content: string) {
    var txtMsg = {
      type: 1,
      convId: YOUR_CONVERSATION_ID,
      message: {
        content: content
      }
    };

    this.stringeeChat.sendMessage(txtMsg, function (status, code, message, msg) {
      //  console.log(status + code + message + "msg result " + JSON.stringify(msg));
    });
  }

  // Hàm lấy số lượng tin nhắn cuối cùng ở trong conten message
  async getLastMessages(YOUR_CONVERSATION_ID: string) {
    var convId = YOUR_CONVERSATION_ID;
    var count = 50;
    var isAscending = true;
    var msgsRender: any;
    msgsRender = await this.getLastMsg(convId, count, isAscending);
    console.log("ms" + typeof (msgsRender));
    return msgsRender;
  }

  getLastMsg(convId, count, isAscending) {
    return new Promise((resolve, reject) => {
      this.stringeeChat.getLastMessages(convId, count, isAscending, function (status, code, message, msgs) {
        console.log("msgs " + msgs);
        resolve(msgs);
      });
    })
  }
  // Hàm lấy số lượng cuộc trò chuyện cuối cùng ở trong content message
  async getLastConversations() {
    var count = 10;
    var isAscending = true;
    var convsRender: any;
    convsRender = await this.getLastConv(count, isAscending);
    console.log("cv" + convsRender);
    return convsRender;

  }
  getLastConv(count, isAscending) {
    return new Promise((resolve) => {
      this.stringeeChat.getLastConversations(count, isAscending, function (status, code, message, convs) {
        resolve(convs);
      });
    })
  }
  /*============================================== THÔNG TIN USER ============================================================= */

  // Update thong tin user
  updateUserInfo(data) {
    this.stringeeChat.updateUserInfo(data, function (res) {
      console.log(res)
    });
  }
  async getUserInfo(userIds) {
    var users: any;
    users = await this.getUser(userIds);
    return users;
  }
  getUser(userIds) {
    var userId = [userIds];
   // console.log(userId);
    return new Promise((resolve) => {
      this.stringeeChat.getUsersInfo(userId, function (status, code, message, users) {
        resolve(users);
      });
    })
  }
 
  /*================================================ HÀM PHỤ TRỢ =============================================================== */
  // Hàm lấy userId hiện tại của người dùng đăng nhập
 

}
