import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '@app/models/chat';
import { User } from '@app/models';

@Component({
  selector: 'app-conversation-about',
  templateUrl: './conversation-about.component.html',
  styleUrls: ['./conversation-about.component.scss']
})
export class ConversationAboutComponent implements OnInit {

  constructor() {

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
  }
  // Lây danh sách file chung 
  getFiles() {
    // return this.response.filter(mess => ((mess.type == 5)));
  }
  watchImagePreview(src) {
    this.imagePreview = src;
  }
}
