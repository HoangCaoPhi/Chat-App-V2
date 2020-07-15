import { Component, OnInit, Input, ElementRef, ViewChildren, QueryList, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core'

import { Chat } from '../../../models/chat';
import { ComponentShareService } from '../../../services/component-share.service';
import { User } from '@app/models';
import { StringeeService } from '@app/services/stringee/stringee.service';
import { Subscription } from 'rxjs';


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
    private stringeeService: StringeeService,
    private componentShareService: ComponentShareService
  ) {
    this.getParam();
    route.params.subscribe(val => {
      this.getConvesationLast(this.convIdFromDataTranfer);
    });

  }

  ngOnInit(): void { }
  
  /*
        Nhận convId được đẩy từ conversation list 
  */
  convIdFromDataTranfer: any;
  valueFromChildSubscription: Subscription;
  getParam() {
    this.valueFromChildSubscription = this.componentShareService.ValueFromChild.subscribe(
      data => {
        this.convIdFromDataTranfer = data;
        console.log("This is a conversation id" + this.convIdFromDataTranfer);
      }
    );
  }
/*=================================================         CÁC HÀM LẤY TỪ STRINGEE         ================================================================*/
  /*
        Lấy cuộc trò chuyện cuối cùng để hiển thị ở phần content message 
  */
  async getConvesationLast(convId) {
    this.responseLastMsg = await this.stringeeService.getLastMessages(convId);
  }


  /**   
         Gửi tin nhắn 
  */

  sendMesseage(sendForm: NgForm) {
    console.log(sendForm.value);
    this.stringeeService.sendTextMessage(this.convIdFromDataTranfer, sendForm.value.message);
    sendForm.reset();
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

  ngOnDestroy() {
    this.valueFromChildSubscription.unsubscribe();
  }
}

