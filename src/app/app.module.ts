import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { appRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { LoginComponent } from './login/login.component';
import { ChatService } from './services/chat.service';
import { RegisterComponent } from './register/register.component';

// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';

import { MessageService } from './services/stringee/message.service';
import { HomeComponent } from './chat/home/home.component';
import { ViewComponent } from './chat/conversation-detail/conversation-detail.component';
import { ConversationAboutComponent } from './chat/conversation-about/conversation-about.component';
import { HeaderComponent } from './share/header/header.component';
import { ListComponent } from './chat/conversation-list/conversation-list.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        FormsModule,
        AvatarModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent, 
        LoginComponent, 
        ViewComponent,
        ConversationAboutComponent,
        HeaderComponent,
        ListComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ChatService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }