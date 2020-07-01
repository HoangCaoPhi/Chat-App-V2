import { Component, OnInit, Input, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Chat } from '../../_models/chat';
import { ChatService } from '../../_services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core'

class ImageSpinnet {
  constructor(public src: string, public file: File) { }
}

  @Component({
    selector: 'app-conversation-detail',
    templateUrl: './conversation-detail.component.html',
    styleUrls: ['./conversation-detail.component.scss']
  })
export class ViewComponent implements OnInit {

  chat: Chat;
  showFile: boolean = true;
  showImg: boolean = true;
  showRight: boolean = true;
  new: any;
  classView: any = 'col-sm-9 content-view';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
  ) {
    route.params.subscribe(val => {
      this.getConversationById();
    });
  }

  ngOnInit(): void { }

  getConversationById() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.chatService.getChat(id).subscribe(chat => this.chat = chat);
  }

  sendMesseage(sendForm: NgForm) {
    console.log(sendForm.value);
    this.new =
    {
      id: this.chat.listMesseage.length + 1,
      content: sendForm.value.message,
      time: Date(),
      fromMe: false,
      type: 'text'
    }

    if (this.new) {
      console.log(this.chat.listMesseage);
      this.chat.listMesseage.push(this.new);
    }
  }
  // Upload file
  selectedFile: ImageSpinnet;
  processFile(imageInput: any) {
    debugger
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      debugger
      this.selectedFile = new ImageSpinnet(event.target.result, file);
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
 // Show Hide
  toggleFile() {
    this.showFile = !this.showFile;
  }
  toggleImg() {
    this.showImg = !this.showImg;
  }
  toggleInfo() {
    this.showRight = !this.showRight;
    if (!this.showRight) {
      this.classView = "col-sm-12 content-view";
    }
    else {
      this.classView = "col-sm-9 content-view";
    }
  }
 // Scoll bar messeage
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

