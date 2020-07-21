import { Component, OnInit, Input, ElementRef, ViewChildren, QueryList, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core'

import { Chat } from '../../../models/chat';
import { ComponentShareService } from '../../../services/component-share.service';
import { User } from '@app/models';
import { StringeeService } from '@app/services/stringee/stringee.service';
import { Subscription, Observable } from 'rxjs';
import { UserIdTranferService } from '@app/services/user-tranfer.service';
import { UserService } from '@app/services/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileService } from '@app/services/message/file.service';

class FileSpinnet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.scss']
})
export class ViewComponent implements OnInit {
  imagePreview: any;
  showAboutRight: boolean = true;
  @Input() responseLastMsg: any; // Nhận về tin nhắn từ stringee
  UserId: string = JSON.parse(localStorage.getItem("currentUser")).id;
  convIdFromDataTranfer: any; // Nhận convId từ contact list
  userShareService: any; // Nhan userId tu contact list
  userInfo: any; // Thông tin user lấy theo id
  convId: string;
  loading: boolean = false;
  // @Output() getMessageLast = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private stringeeService: StringeeService,
    private componentShareService: ComponentShareService,
    private userIdTranfer: UserIdTranferService,
    private http: HttpClient,
    private _chatservice: FileService,
  ) {
    route.params.subscribe(val => {
      this.convId = this.route.snapshot.paramMap.get('id');
    });
  }
  ngOnInit(): void {

  }

  /* #region  TRANFER SERVICE  */

  /* #region  XỬ LÝ STRINGEE  */
  //    Lấy cuộc trò chuyện cuối cùng để hiển thị ở phần content message 
  getConvesationLast(id: string) {
    this.stringeeService.stringeeServiceMessage(id, (status, code, message, msgs) => {
      this.responseLastMsg = msgs;
    });
  }
  //    Gửi tin nhắn 
  sendMesseage(sendForm: NgForm) {
    console.log(sendForm.value);
    if (sendForm.value.message) {
      this.stringeeService.sendTextMessage(this.convId, sendForm.value.message);
      sendForm.reset();
    }
    this.getConvesationLast(this.convId);
    this.componentShareService.setConversationId(this.convId);
  }
  //  Gửi file
  imgPath: any
  selectedFile: FileSpinnet;
  processImage(fileInput: any) {
    const file: File = fileInput.files[0];
    let fileType: string;
    fileType = fileInput.files[0].name.split(".").pop() // Lấy đuôi file
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new FileSpinnet(event.target.result, file);
      var formData = new FormData();
      formData.set('file', file)

      this._chatservice.postFile(formData, JSON.parse(localStorage.getItem('currentUser')).token).subscribe(
        (res) => {
          this.imgPath = res; console.log(this.imgPath.filename)
          this.stringeeService.sendFile(2, this.selectedFile.file.name, this.convId, this.selectedFile.file.name, this.imgPath.filename, file.size)
        }
      )
      this.getConvesationLast(this.convId);
      this.componentShareService.setConversationId(this.convId);
    });
    reader.readAsDataURL(file);
  }
  // Xử lý sự kiện upload file
  processFile(fileInput: any) {
    const file: File = fileInput.files[0];
    let fileType: string;
    fileType = fileInput.files[0].name.split(".").pop() // Lấy đuôi file
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new FileSpinnet(event.target.result, file);
      var formData = new FormData();
      formData.set('file', file)
      this._chatservice.postFile(formData, JSON.parse(localStorage.getItem('currentUser')).token).subscribe(
        (res) => {
          this.imgPath = res; console.log(this.imgPath.filename)
          this.stringeeService.sendFile(5, this.selectedFile.file.name, this.convId, this.selectedFile.file.name, this.imgPath.filename, file.size)
        }
      )
      this.getConvesationLast(this.convId);
      this.componentShareService.setConversationId(this.convId);
    });
    reader.readAsDataURL(file);
  }


  /* #region  XỬ LÝ PHẦN GIAO DIỆN  */

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

  // Xem trước hình ảnh
  watchImagePreview(src) {
    this.imagePreview = src;
  }
  // Xử lý sự kiện click tin nhắn dạng file
  openFile(url: string) {
    window.open(url, "");
  }



  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  // Sự kiện di chuột lên xem tin nhắn trước
  onUp() {
    console.log('scrolled up!');
    this.loading = true;
    this.stringeeService.stringeeServiceGetBeforeMessage(this.responseLastMsg[0].sequence, this.convId, (status, code, message, msgs) => {
          this.responseLastMsg = msgs.concat(this.responseLastMsg);
          setTimeout(() => {
            /** spinner ends after 5 seconds */
            this.loading = false;
          }, 5000);
       
    });
    this.direction = 'up';
  }
}

