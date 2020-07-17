import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '@app/models/chat';
import { User } from '@app/models';

@Component({
  selector: 'app-conversation-about',
  templateUrl: './conversation-about.component.html',
  styleUrls: ['./conversation-about.component.scss']
})
export class ConversationAboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("day la component about")
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

  @Input() userShareService:any;

  // Lây danh sách tin nhắn hình ảnh chung 
  getImageMessegae(img) {
    return img.filter(image => image.type === 'image');
  }

  watchImagePreview(src) {
    this.imagePreview = src;
  }
}
