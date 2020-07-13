import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './models';
import { MessageService } from './services/stringee/message.service';


@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: any;
    constructor(private messageService: MessageService) {
  
    }
    ngOnint() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            this.messageService.connectStringee(this.currentUser.token);
            this.messageService.connectListners();
        }
         this.messageService.authenListners();
         this.messageService.disconnectListners();
    }
}