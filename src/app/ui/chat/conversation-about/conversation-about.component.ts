import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '@app/models/chat';
import { User } from '@app/models';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '@app/services/message/file.service';
import { ComponentShareService } from '@app/services/component-share.service';

@Component({
  selector: 'app-conversation-about',
  templateUrl: './conversation-about.component.html',
  styleUrls: ['./conversation-about.component.scss']
})
export class ConversationAboutComponent implements OnInit {
  //#region Field
  convId: any;
  files: any;
  imgs: any;
  showFile: boolean = true;
  showImg: boolean = true;
  imagePreview: any;
  @Input() userShareService: any;
  @Input() response: any;
  //#endregion

  //#region Contructor
  constructor(private router: Router,
    private route: ActivatedRoute,
    private componentShareService: ComponentShareService,
    private _chatservice: FileService,) {
    route.params.subscribe(val => {
      this.convId = val.id;
      this.getFiles();
      this.getImages();
      this.getParam();
    });
  }
  ngOnInit(): void { }
  //#endregion

  //#region Handle Frontend
  // Ẩn hiện file và hình ảnh chung
  toggleFile() {
    this.showFile = !this.showFile;
  }
  toggleImg() {
    this.showImg = !this.showImg;
  }
  /**
   *  Lấy ra các hình ảnh được lấy từ Db
   */
  getImages() {
    this._chatservice.getAllFile(this.convId).subscribe(
      (res) => { this.imgs = res }
    )
  }
/**
 *    Lấy các file chung
 */
  getFiles() {
    // return this.response.filter(mess => ((mess.type == 5)));
    this._chatservice.getAllFile(this.convId).subscribe(
      (res) => { this.files = res }
    )
  }

  watchImagePreview(src) {
    this.imagePreview = src;
  }
  //#endregion

  //#region Tranfer Data
      // Nhận sự thay đổi Id cuộc trò chuyện
      getParam() {
        this.componentShareService.getConversationId$.subscribe(() => {
          this.getFiles();
          this.getImages();
        });
      }
  //#endregion
}
