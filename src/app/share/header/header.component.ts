import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../services/authentication.service';
import { User } from './../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@app/services/user/user.service';
import { StringeeService } from '@app/services/stringee/stringee.service';
import { FileService } from '@app/services/message/file.service';
import { NotifierService } from 'angular-notifier';
class FileSpinnet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  @Input() userShareService: any;
  UserId: string = JSON.parse(localStorage.getItem("currentUser")).id;
  filePath: any;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private _userservice: UserService,
    private stringeeService: StringeeService,
    private _chatservice: FileService,
    private notifier: NotifierService
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
      contactMobile: ["", [Validators.required]],
      avatarUrl: ["", [Validators.required]],
    })
  }
  onSubmit() {

    this._userservice.updateInfo(this.UserId, this.form.value).subscribe(
      data => {
        this.showNotification('success', 'Cập nhật thông tin thành công !');
        let updateUserData = {
          display_name: data.userName,
          avatar_url: data.avatarUrl,
          email: ""
        }
        this.stringeeService.updateUserInfo(updateUserData);
        // this.updateUserInfo(updateUserData);
       // console.log(data);
        document.getElementById("closeModal").click();
      },
      error => {
        this.showNotification('error', error)
      }
    );
  }

  //  Gửi file
  imgPath: any
  selectedFile: FileSpinnet;
  /**
   * Gửi tin nhắn dạng file
   * @param fileInput FileInput lấy từ người dùng khi kích hoạt sự kiện gửi file
   */
  processImage(fileInput: any) {
    const file: File = fileInput.files[0];
    let fileType: string;
    fileType = fileInput.files[0].name.split(".").pop() // Lấy đuôi file
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new FileSpinnet(event.target.result, file);
      this.filePath = this.selectedFile.src;
      var formData = new FormData();
      formData.set('file', file)
      // Post file lên server Stringee
      // Gửi file lên server Stringee
      this._chatservice.postFile(formData, JSON.parse(localStorage.getItem('currentUser')).token).subscribe(
        (res) => {
          this.filePath = res.filename;
          this.form.value.avatarUrl = res.filename;
        }
      )
    });
    reader.readAsDataURL(file);
  }
  /**
* Show a notification
*
* @param {string} type    Notification type
* @param {string} message Notification message
*/
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}
