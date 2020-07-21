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

  /*================================================  KẾT NỐI VÀ LẮNG NGHE  ========================================================================== */
  // Hàm connect stringge
  connectStringee(ACCESS_TOKEN) {
    this.stringeeClient.connect(ACCESS_TOKEN);
  }
 

  // Lắng nghe onconnect
  connectListners() {
    this.stringeeClient.on('connect', () => {
      
      this.realTimeUpdate();

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


  /*======================================================================  TẠO CUỘC TRÒ CHUYỆN   ======================================================================= */

  // Hàm tạo cuộc trò truyện với một người khác
  creaateConversationService(user: User, callback: any) {
    var userIds = [user.id];
    var options = {
      isDistinct: false,
      isGroup: false
    };
    this.stringeeChat.createConversation(userIds, options, callback);
  }


  /*======================================================================== GỬI TIN NHẮN ===================================================================================================== */
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
  sendFile(type: number, message: string, convId: string, fName: string, fPath: string, fLenght: number){
    var fileMsg = {
      type: type,
      convId: convId,
      message: {
        content: message,
        file: {
          filePath: fPath,
          filename: name,
          length: fLenght
        },
        metadata: {
          key: 'value'
        }
      }
    };
    this.stringeeChat.sendMessage(fileMsg, function (status, code, message, msg) {
      //console.log(status + code + message + "msg result " + JSON.stringify(msg));
    });
  }

  /*=======================================================  LẤY CUỘC TRÒ CHUYỆN VÀ TIN NHẤN ==================================================================================================================== */
  // Lấy ra các tin nhan
  stringeeServiceMessage(convId: string, callback: any) {
    this.stringeeChat.getLastMessages(convId, 10, true, callback);
  }
  // Lấy tin nhắn trước
   stringeeServiceGetBeforeMessage(sequence: number, convId: string, callback: any) {
    var count = 10;
    var isAscending = true;
    this.stringeeChat.getMessagesBefore(convId, sequence, count, isAscending, callback);
   }
  // Lấy ra các cuộc trò chuyện
  stringeeServiceConversation(callback: any) {
    this.stringeeChat.getLastConversations(25, false, callback);
  }

  /*=================================================================== THÔNG TIN USER =================================================================================== */

  // Update thong tin user
  updateUserInfo(data) {
    this.stringeeChat.updateUserInfo(data, function (res) {
      console.log(res)
    });
  }
  getUserInfo(userId: any, callback: any) {
    this.stringeeChat.getUsersInfo([userId], callback);
  }
  
  // Realtime update
  realTimeUpdate() {
    this.stringeeChat.on('onObjectChange', function (info) {
      console.log(info);
    });
  }
  /*================================================ HÀM PHỤ TRỢ =============================================================== */
  // Hàm lấy userId hiện tại của người dùng đăng nhập


}
