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
  convId: any;
  files: any;
  imgs: any;

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

  ngOnInit(): void {

  }

  showFile: boolean = true;
  showImg: boolean = true;
  imagePreview: any;

  // Ẩn hiện file và hình ảnh chung
  toggleFile() {
    this.showFile = !this.showFile;
  }
  toggleImg() {
    this.showImg = !this.showImg;
  }

  @Input() userShareService: any;
  @Input() response: any;

  // Lây danh sách tin nhắn hình ảnh chung 
  getImages() {
    // return this.response.filter(mess => ((mess.type == 2)));
    this._chatservice.getAllFile(this.convId).subscribe(
      (res) => { this.imgs = res }
    )
  }
  // Lây danh sách file chung 
  getFiles() {
    // return this.response.filter(mess => ((mess.type == 5)));
    this._chatservice.getAllFile(this.convId).subscribe(
      (res) => { this.files = res }
    )
  }

    // Conversation id được nhận từ conversation detail
    getParam() {
      this.componentShareService.getConversationId$.subscribe( () => {
        this.getFiles();
        this.getImages();
      });
  
    }
  watchImagePreview(src) {
    this.imagePreview = src;
  }
}
