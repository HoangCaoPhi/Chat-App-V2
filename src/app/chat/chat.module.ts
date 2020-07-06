import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ShareModule } from '../share/share.module';

import { HomeComponent } from './home/home.component';
import { ListComponent } from './conversation-list/conversation-list.component';
import { ViewComponent } from './conversation-detail/conversation-detail.component';

import { FormsModule } from '@angular/forms';
import { ConversationAboutComponent } from './conversation-about/conversation-about.component';
import { ConversationHeaderComponent } from './conversation-header/conversation-header.component'


@NgModule({
  declarations: [HomeComponent, ListComponent, ViewComponent, ConversationAboutComponent, ConversationHeaderComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ShareModule
  ]
})
export class ChatModule { }
