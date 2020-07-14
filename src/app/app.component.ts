import { Component, OnInit } from '@angular/core';
import { StringeeService } from './services/stringee/stringee.service';


@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
    currentUser: any;
    constructor(private messageService: StringeeService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //console.log(this.currentUser.token);
        if (this.currentUser) {
            this.messageService.connectStringee(this.currentUser.token);
            this.messageService.connectListners();
        }
         this.messageService.authenListners();
         this.messageService.disconnectListners();
    }
    ngOnInit() {
   
    }
}