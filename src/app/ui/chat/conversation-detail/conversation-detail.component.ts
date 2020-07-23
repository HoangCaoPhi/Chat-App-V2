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
  //#region Field
  imagePreview: any;
  showAboutRight: boolean = true;
  @Input() responseLastMsg: any; // Nhận về tin nhắn từ stringee
  @Input() userCurrentShareService;
  @Input() userShareService: any;  
  UserId: string = JSON.parse(localStorage.getItem("currentUser")).id;
  convIdFromDataTranfer: any; // Nhận convId từ contact list
 
  userInfo: any; // Thông tin user lấy theo id
  convId: string;
  loading: boolean = false;
  //  Gửi file
  imgPath: any
  selectedFile: FileSpinnet;
  //#endregion

  //#region Contructor
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

      this.getConvesationLast(this.convId);

      this.stringeeService.stringeeChat.on('onObjectChange', () => {
        this.getConvesationLast(this.convId);
        this.componentShareService.setConversationId(this.convId);
      })
    });
  }
  ngOnInit(): void {
  
  }
  //#endregion

  //#region Stringee Handle
  /**
   * Lấy ra tin nhắn chi tiết của từng cuộc trò chuyện
   * @param id Id của cuộc trò chuyện lấy từ router
   */
  getConvesationLast(id: string) {
    this.stringeeService.stringeeServiceMessage(id, (status, code, message, msgs) => {
      this.responseLastMsg = msgs;
    });
  }
  /**
   * Gửi tin nhắn dạng text
   * @param sendForm Form value được lấy khi người dùng nhập
   */
  sendMesseage(sendForm: NgForm) {
    console.log(sendForm.value);
    if (sendForm.value.message) {
      this.stringeeService.sendTextMessage(this.convId, sendForm.value.message);
      sendForm.reset();
    }
    this.getConvesationLast(this.convId);
    this.componentShareService.setConversationId(this.convId); // Truyền sự kiện để update lại last message ở conversation list
  }
  /**
   * Gửi tin nhắn dạng file
   * @param fileInput FileInput lấy từ người dùng khi kích hoạt sự kiện gửi file
   */
  processImage(fileInput: any) {
    const file: File = fileInput.files[0];
    let fileType: string;
    fileType = fileInput.files[0].name.split(".").pop() // Lấy đuôi file
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new FileSpinnet(event.target.result, file);
      var formData = new FormData();
      formData.set('file', file)
      // Post file lên server Stringee
      this._chatservice.postFile(formData, JSON.parse(localStorage.getItem('currentUser')).token).subscribe(
        (res) => {
          this.imgPath = res;
          this.stringeeService.sendFile(2, this.selectedFile.file.name, this.convId, this.selectedFile.file.name, this.imgPath.filename, file.size)
          // Post file lên db
          this._chatservice.postFileDatabase(this.convId, this.selectedFile.file.name, this.imgPath.filename, 2, fileType).subscribe()
        }
      )
      // Gọi lại cuộc trò chuyện và truyền sự kiện cập nhật lại cvlist
      this.getConvesationLast(this.convId);
      this.componentShareService.setConversationId(this.convId);
    });
    reader.readAsDataURL(file);
  }
  /**
    * Gửi tin nhắn dạng file
    * @param fileInput FileInput lấy từ người dùng khi kích hoạt sự kiện gửi file
    */
  processFile(fileInput: any) {
    const file: File = fileInput.files[0];
    let fileType: string;
    fileType = fileInput.files[0].name.split(".").pop() // Lấy đuôi file
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new FileSpinnet(event.target.result, file);
      var formData = new FormData();
      formData.set('file', file);
      // Gửi file lên server Stringee
      this._chatservice.postFile(formData, JSON.parse(localStorage.getItem('currentUser')).token).subscribe(
        (res) => {
          this.imgPath = res;
          this.stringeeService.sendFile(5, this.selectedFile.file.name, this.convId, this.selectedFile.file.name, this.imgPath.filename, file.size);
          // Gửi thông tin file và đường dẫn lên server net core
          this._chatservice.postFileDatabase(this.convId, this.selectedFile.file.name, this.imgPath.filename, 5, fileType).subscribe();
        }
      )
      this.getConvesationLast(this.convId);
      this.componentShareService.setConversationId(this.convId);
    });
    reader.readAsDataURL(file);
  }
  //#endregion

  //#region Handle Front
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

  // Xử lý load more message
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2; // Khoảng cách cần thiết để nhận sự kiện scoll
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
      }, 3000);
    });
    this.direction = 'up';
  }
  //#endregion

}

