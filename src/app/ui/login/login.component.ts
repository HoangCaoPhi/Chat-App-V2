import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/services/authentication.service';

import { StringeeClient, StringeeChat } from "stringee-chat-js-sdk";
import { StringeeService } from '@app/services/stringee/stringee.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    //#region Field
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    ACCESS_TOKEN: string;
    //#endregion

    //#region Contructor
    constructor(
        private formBuilder: FormBuilder,
        private stringeeService: StringeeService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }
    //#endregion   

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
        // điều hướng khi đăng nhập thành công
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat/1';
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
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}