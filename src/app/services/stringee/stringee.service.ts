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
  stringeeChat   = new StringeeChat(this.stringeeClient);

  //#region KẾT NỐI VÀ LẮNG NGHE 
  /**
   * Kết nối với Stringee
   * @param ACCESS_TOKEN Access thông tin token được trả về từ server
   */
  connectStringee(ACCESS_TOKEN) {
    this.stringeeClient.connect(ACCESS_TOKEN);
  }

  /**
   * Update thông tin người dùng lên server Stringee
   */
  getAndUpdateInfo() {
    let token = JSON.parse(localStorage.getItem('currentUser')).token;
    let decodeToken = jwt_decode(token);

    let userId = decodeToken["userId"];
    let username = decodeToken["userName"];
    let avatar = decodeToken["avt"];

    console.log('++++++++++++++ connected to StringeeServer');
    console.log("User Id la" + userId + "UserName" + username + "avatar" + avatar);
    // Lấy thông tin của người dùng rồi update
    this.stringeeChat.getUsersInfo([userId], (status, code, msg, users) => {
      let user = users[0];
      if (1) {
        let updateUserData = {
          display_name: username,
          avatar_url: avatar,
          email: ""
        }
        this.updateUserInfo(updateUserData);
      }
    })
  }
  /**
   * Lắng nghe authen
   */
  authenListners() {
    this.stringeeClient.on('authen', function (res) {
    //  console.log('authen', res);
    });
  }

  /**
   * Lắng nghe sự kiện disconnect
   */
  disconnectListners() {
    this.stringeeClient.on('disconnect', function () {
      console.log('++++++++++++++ disconnected');
    });
  }
  //#endregion

  //#region TẠO CUỘC TRÒ CHUYỆN   

  /**
   * Tạo cuộc trò chuyện lên stringee
   * @param user Thông tin của user được truyền vào để lấy user id
   * @param callback Callback được truyền vào từ những file ts được inject service này
   */
  creaateConversationService(user: User, callback: any) {
    var userIds = [user.id];
    var options = {
      isDistinct: false,
      isGroup: false
    };
    this.stringeeChat.createConversation(userIds, options, callback);
  }
  //#endregion

  //#region GỬI TIN NHẮN 
  /**
   * Gửi tin nhắn dạo text
   * @param YOUR_CONVERSATION_ID Id của cuộc trò chuyện
   * @param content Nội dung của tin nhắn được gửi
   */
  sendTextMessage(YOUR_CONVERSATION_ID: string, content: string) {
    var txtMsg = {
      type: 1,
      convId: YOUR_CONVERSATION_ID,
      message: {
        content: content
      }
    };
    this.stringeeChat.sendMessage(txtMsg, function (status, code, message, msg) {
    });
  }
  /**
   * Gửi file
   * @param type Loại của tin nhắn được gửi dạng ảnh là 2 và dạng file là 5
   * @param message Nội dung của tin nhắn
   * @param convId Id của cuộc trò chuyện
   * @param fName Tên của file
   * @param fPath Đường dẫn của file
   * @param fLenght Kích cỡ của file
   */
  sendFile(type: number, message: string, convId: string, fName: string, fPath: string, fLenght: number) {
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
    });
  }
  //#endregion

  //#region LẤY CUỘC TRÒ CHUYỆN VÀ TIN NHẤN 
  /**
   * Lấy tin nhắn của từng cuộc trò chuyện tương ứng
   * @param convId Id của cuộc trò chuyện
   * @param callback Callback truyền vào từ những file được gọi
   */
  stringeeServiceMessage(convId: string, callback: any) {
    this.stringeeChat.getLastMessages(convId, 10, true, callback);
  }
  /**
   * Lấy ra những tin nhắn trước của loạt tin nhắn 
   * @param sequence Thứ tự của tin nhắn để lấy
   * @param convId Thông tin của cuộc trò chuyện
   * @param callback Callback được truyền vào từ file được gọi
   */
  stringeeServiceGetBeforeMessage(sequence: number, convId: string, callback: any) {
    var count = 10;
    var isAscending = true;
    this.stringeeChat.getMessagesBefore(convId, sequence, count, isAscending, callback);
  }
  /**
   * Lấy ra tất cả các cuộc trò chuyện
   * @param callback Callback được truyền vào từ file được gọi
   */
  stringeeServiceConversation(callback: any) {
    this.stringeeChat.getLastConversations(25, false, callback);
  }
  //#endregion

  //#region THÔNG TIN USER
  /**
   * Update thông tin của người dùng trên serve Stringee
   * @param data Thông tin được truyền vào để update
   */
  updateUserInfo(data) {
    this.stringeeChat.updateUserInfo(data, function (res) {
      console.log(res)
    });
  }
  /**
   * Lấy ra thông tin của user
   * @param userId id của người dùng
   * @param callback callback được truyền vào
   */
  getUserInfo(userId: any, callback: any) {
    this.stringeeChat.getUsersInfo([userId], callback);
  }

  // Realtime update
  realTimeUpdate() {
    this.stringeeChat.on('onObjectChange', function (info) {
    //  console.log(info);
    });
  }
  //#endregion
}
