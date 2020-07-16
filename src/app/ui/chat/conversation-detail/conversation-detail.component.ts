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
  user: User;
  avatarSender: string;
  responseLastMsg: any;
  messages: object;
  UserId: string = JSON.parse(localStorage.getItem("currentUser")).id;
  convIdFromDataTranfer: any; // Nhận convId từ contact list

  constructor(
    private route: ActivatedRoute,
    private stringeeService: StringeeService,
    private componentShareService: ComponentShareService
  ) {
    route.params.subscribe(val => {
      this.getParam();
      this.getConvesationLast(this.convIdFromDataTranfer);
      this.tranferConversationById();
    });

  }
  ngOnInit(): void { }

  /*=========================================================  TRANFER SERVICE ======================================================================== */
  // Nhận convId được đẩy từ conversation list 
  getParam() {
    this.componentShareService.getConversationId$.subscribe(convId => this.convIdFromDataTranfer = convId);
  }
  // Tranfer id cho contact list
  tranferConversationById() {
    const id = this.route.snapshot.paramMap.get('id');
    this.componentShareService.setConversationId(id);
  }

  /*========================================================== CÁC HÀM LẤY TỪ STRINGEE ===================================================================*/
  //    Lấy cuộc trò chuyện cuối cùng để hiển thị ở phần content message 
  getConvesationLast(convId) {
    if(!convId) {
        convId = this.route.snapshot.paramMap.get('id');
    }
    this.stringeeService.stringeeServiceMessage(convId, (status, code, message, msgs) => {
      this.responseLastMsg = msgs;
    });
  }
  //    Gửi tin nhắn 
  sendMesseage(sendForm: NgForm) {
    console.log(sendForm.value);
    this.stringeeService.sendTextMessage(this.convIdFromDataTranfer, sendForm.value.message);
    sendForm.reset();
  }

  /*========================================================== XỬ LÝ Ở PHẦN GIAO DIỆN  ===========================================================================================*/
  //   Ẩn hay Hiển thị phần thông tin tin nhắn
  toggleInfo() {
    this.showAboutRight = !this.showAboutRight;
  }
  // Tự động Scollbar khi gửi tin nhắn
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
}

