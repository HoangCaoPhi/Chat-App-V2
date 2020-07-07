import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from '@app/_models/chat';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  chat: Chat;

  constructor( private route: ActivatedRoute, private router: Router) { 
    //   this.router.events.subscribe((event) => {
    //     console.log(event);
    // });
    
  }

  ngOnInit(): void {
 
  }

 
}
