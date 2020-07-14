import { Injectable } from '@angular/core';

import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
import { User } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

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
    this.stringeeClient.on('connect', function () {
      console.log('++++++++++++++ connected to StringeeServer');
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

  // Hàm lấy số lượng tin nhắn cuối cùng
  // getLastMessages(YOUR_CONVERSATION_ID: string) {
  //   var convId = YOUR_CONVERSATION_ID;
  //   var count = 50;
  //   var isAscending = false;
  //   this.stringeeChat.getLastMessages(convId, count, isAscending, function (status, code, message, msgs) {
  //     console.log(JSON.stringify(msgs));
  //   });
  // }

  async getLastMessages(YOUR_CONVERSATION_ID: string) {
    var convId = YOUR_CONVERSATION_ID;
    var count = 50;
    var isAscending = false;
    var msgsRender: any;
    msgsRender = await this.getLastMsg(convId, count, isAscending);
    console.log("ms" + typeof(msgsRender));
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

}
