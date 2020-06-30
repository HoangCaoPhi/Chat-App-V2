import { Component, OnInit } from '@angular/core';

import { Chat } from '../../_models/chat';
import { ChatService } from '../../_services/chat.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  chats: any[];

  constructor(private chatService: ChatService) { }

  _listFilter = '';
  
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filterChats = this.listFilter ? this.performFilter(this.listFilter) : this.chats;
    console.log(`This is list chat = ${JSON.stringify(this.filterChats)}`);
  }

  filterChats: any[] = [];
 

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
 
    return this.chats.filter((chat: any) =>
         chat.name.toLocaleLowerCase().indexOf(filterBy) > -1);
     }

  ngOnInit(): void {
    this.chatService.getInfo().subscribe(
      (getChats) => {
         this.chats = getChats;
         this.filterChats = this.chats;
        // console.log(`This is list chat = ${JSON.stringify(this.filterChats)}`);
      }
    )
  }

  getInfoFromService(): void {
     
  }



}
