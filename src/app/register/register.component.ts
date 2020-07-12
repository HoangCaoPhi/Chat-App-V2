import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '@app/services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '@app/models';



// Hàm kiểm tra password
export function comparePassword(c: FormGroup ) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  user: User;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // Nếu người dùng đã đăng nhập
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/chat/1']);
    }
  }

  ngOnInit(): void {
    // Tạo reative form
    this.form = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
    {
        validator: comparePassword
    });

    // điều hướng khi đăng nhập thành công
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }




  onSubmit() {
    this.submitted = true;

    // Nếu các trường form không hợp lệ
    if (this.form.invalid) {
      return;
    }

    this.loading = true;


    this.authenticationService.register(this.form.value)
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
