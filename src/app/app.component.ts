import { Component, OnInit } from '@angular/core';
import { StringeeService } from './services/stringee/stringee.service';


@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  currentUser: any;
  constructor(private stringeeService: StringeeService) {
  
 
  }
  ngOnInit() {

  }
}