import { Component, OnInit, Input, ElementRef, ViewChildren, QueryList, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core'

import { Chat } from '../../../models/chat';
import { ChatService } from '../../../services/chat.service';
import { ComponentShareService } from '../../../services/component-share.service';
import { User } from '@app/models';
import { StringeeService } from '@app/services/stringee/stringee.service';


class FileSpinnet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.scss']
})
export class ViewComponent implements OnInit {

  showAboutRight: boolean = true;
  chat: Chat;
  user: User;
  avatarSender: string;
  newMesseage: any;
  imagePreview: any;
  responseLastMsg: any;
  messages: object;
  UserId: string = JSON.parse(localStorage.getItem("currentUser")).id;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private stringeeService: StringeeService,
    private componentShareService: ComponentShareService
  ) {
    route.params.subscribe(val => {
      this.getConversationById();
      this.getConvesationLast();
      // this.userId = this.stringeeService.getCurrentUserIdFromAccessToken(localStorage.get("currentUser"));
    });
  }

  ngOnInit(): void {

  }
  /*=================================================         CÁC HÀM LẤY TỪ STRINGEE         ================================================================*/ 
  // Lấy cuộc trò chuyện của từng người dùng
  async getConvesationLast() {
    this.responseLastMsg =  await this.stringeeService.getLastMessages(localStorage.getItem('convId'));
    // console.log("MessageList" +   this.responseLastMsg);
    // let msgsLength =  this.responseLastMsg.length;
    // for (let i = 0; i < msgsLength; i++) { 
    //   let message = this.responseLastMsg[i];
    //   let content = this.responseLastMsg[i].content.content;
    //   console.log(message);
    //   console.log(content);
    // }
  }



  getConversationById() {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log("detail id " + id);
    // Gửi dữ liệu lên service share-component để gửi đến contact list
    this.componentShareService.notifyCountValue(id);
    // Lấy các cuộc hôi thoại với id tương ứng
    this.chatService.getUserId(id).subscribe(user => this.user = user);
  }

  /**   
         Gửi tin nhắn 
  */

  sendMesseage(sendForm: NgForm) {
    // console.log(sendForm.value);
    console.log(sendForm.value);
    this.stringeeService.sendTextMessage(localStorage.getItem('convId'), sendForm.value.message);
    sendForm.reset();

  }
  /**   
         Upload file 
  */
  selectedFile: FileSpinnet;
  processImageFile(imageInput: any) {
    debugger
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      debugger
      this.selectedFile = new FileSpinnet(event.target.result, file);
      let message: any = {
        id: this.chat.listMesseage.length + 1,
        content: this.selectedFile.src,
        time: Date(),
        type: "image",
        fromMe: false,
      };
      this.chat.listMesseage.push(message)
    });
    reader.readAsDataURL(file);
  }

  processFile(fileInput: any) {
    const file: File = fileInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      debugger
      let type_of_file: string = '';

      switch (fileInput.files[0].name.split(".").pop()) {
        case 'doc': {
          type_of_file = 'docx';
          break;
        }

        case 'docx': {
          type_of_file = 'docx';
          break;
        }

        case 'pdf': {
          type_of_file = 'pdf';
          break;
        }

        case 'ppt': case 'pptx': {
          type_of_file = 'pptx';
          break;
        }

        default: {
          type_of_file = 'xlsx';
          break;
        }
      }
      this.selectedFile = new FileSpinnet(event.target.result, file);
      let message: any = {
        id: this.chat.listMesseage.length + 1,
        content: this.selectedFile.file.name,
        url: this.selectedFile.src,
        time: Date(),
        type: "file",
        typeofFile: type_of_file,
        fromMe: false,
      };
      this.chat.listMesseage.push(message)
    });
    reader.readAsDataURL(file);
  }
  openFile(url: string) {
    window.open(url, "");
  }
  /* 
        Ẩn hay Hiển thị phần thông tin tin nhắn
  */

  toggleInfo() {
    this.showAboutRight = !this.showAboutRight;
  }
  getImageMessegae(img) {
    return img.filter(image => image.type === 'image');
  }

  /*
      Tự động Scollbar khi gửi tin nhắn
  */
  @ViewChild('scrollframe', { static: false }) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;

  private scrollContainer: any;
  private items = [];

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());

    // Add a new item every 2 seconds
    setInterval(() => {
      this.items.push({});
    }, 2000);
  }

  private onItemElementsChanged(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  /*
      Xem trước hình ảnh
   */
  watchImagePreview(src) {
    this.imagePreview = src;
  }

}

