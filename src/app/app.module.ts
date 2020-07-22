import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { appRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { LoginComponent } from './ui/login/login.component';
import { RegisterComponent } from './ui/register/register.component';

// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';
import { StringeeService } from './services/stringee/stringee.service';
import { HomeComponent } from './ui/chat/home/home.component';
import { ViewComponent } from './ui/chat/conversation-detail/conversation-detail.component';
import { ConversationAboutComponent } from './ui/chat/conversation-about/conversation-about.component';
import { HeaderComponent } from './share/header/header.component';
import { ListComponent } from './ui/chat/conversation-list/conversation-list.component';
import { CommonModule } from '@angular/common';;
 
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NotifierModule, NotifierOptions } from "angular-notifier";

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
    position: {
          horizontal: {
              position: 'right',
              distance: 12
          },
          vertical: {
              position: 'top',
              distance: 12,
              gap: 10
          }
      },
    theme: 'material',
    behaviour: {
      autoHide: 5000,
      onClick: 'hide',
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4
    },
    animations: {
      enabled: true,
      show: {
        preset: 'slide',
        speed: 300,
        easing: 'ease'
      },
      hide: {
        preset: 'fade',
        speed: 300,
        easing: 'ease',
        offset: 50
      },
      shift: {
        speed: 300,
        easing: 'ease'
      },
      overlap: 150
    }
  };

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        FormsModule,
        AvatarModule,
        InfiniteScrollModule,
        NotifierModule.withConfig(customNotifierOptions)
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
        StringeeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }