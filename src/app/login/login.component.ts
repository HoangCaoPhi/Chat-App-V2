﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/services';

import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
import { MessageService } from '@app/services/stringee/message.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    // ACCESS_TOKEN = '';
    // stringeeClient = new StringeeClient();

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // Nếu người dùng đã đăng nhập
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/chat/1']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // điều hướng khi đăng nhập thành công
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // Trả về loginForm Control
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // Nếu các trường form không hợp lệ
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        // Gọi service login 
        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    // this.ACCESS_TOKEN = data.token;
                    // console.log(this.ACCESS_TOKEN);
                    // this.messageService.connectStringee(this.ACCESS_TOKEN);
                    // this.messageService.connectListners();
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
            });
        }
    
}