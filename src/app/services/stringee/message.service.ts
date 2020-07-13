import { Injectable } from '@angular/core';

import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
import { User } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  stringeeClient = new StringeeClient();
  stringeeChat   = new StringeeChat(this.stringeeClient);

  // Hàm connect stringge
  connectStringee(ACCESS_TOKEN) {
    this.stringeeClient.connect(ACCESS_TOKEN);
  }
  // Hàm tạo cuộc trò truyện với một người khác
  creaateConversation(user: User) {
    var userIds = user.id;
    var options = {
      isDistinct: false,
      isGroup: false
    };
    this.stringeeChat.createConversation(userIds, options, (status, code, message, conv) => {
      console.log('status:' + status + ' code:' + code + ' message:' + message + ' conv:' + JSON.stringify(conv));
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
  
}
