import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from '@app/models/chat';
import { StringeeService } from '@app/services/stringee/stringee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  constructor(private messageService: StringeeService) {
    console.log("Day la Home")
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.messageService.connectStringee(this.currentUser.token);
    //this.messageService.connectListners();
  }
  ngOnInit(): void { }
}
