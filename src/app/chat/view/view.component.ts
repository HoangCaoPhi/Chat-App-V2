import { Component, OnInit, Input, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Chat } from '../../_models/chat';
import { ChatService } from '../../_services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  chat: any;
  showFile: boolean = true;
  showImg: boolean = true;
  showRight: boolean = true;
  messeages: any[];
  new: any;
  classView: any = 'col-sm-9 content-view';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
  ) {
    route.params.subscribe(val => {
      const id = +this.route.snapshot.paramMap.get('id');
    //  console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);
      this.chatService.getChat(id).subscribe(chat => this.chat = chat);   
    //  console.log(this.chat);
    });
  }

  ngOnInit(): void {
    // this.route.data
    //   .subscribe((data: { chat: Chat }) => {
    //     this.chat = data.chat;
    //     this.messeages = data.chat.listMesseage;
    //   });
  }
 
   
  // getParamId() {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap.get('id'))}`);
  // }

  sendMesseage(sendForm: NgForm) {
    console.log(sendForm.value);
    this.new =
    {
      id: this.chat.listMesseage.length + 1,
      content: sendForm.value.message,
      time: Date(),
      fromMe: false
    }

    if (this.new) {
      console.log(this.chat.listMesseage);
      this.chat.listMesseage.push(this.new);
    }
  }

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
