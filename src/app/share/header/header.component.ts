import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../services/authentication.service';
import { User } from './../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  @Input() userShareService: any;
  
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private fb: FormBuilder,
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
  form: FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.pattern(("(09|03|08)[0-9 ]{8}"))]],
    })
  }
}
