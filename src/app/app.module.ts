import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
 

import { AppComponent } from './app.component';
import { appRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { LoginComponent } from './login/login.component';
import { ChatService } from './services/chat.service';
import { RegisterComponent } from './register/register.component';

// Import your AvatarModule
import { AvatarModule } from 'ngx-avatar';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        FormsModule,
        // Specify AvatarModule as an import
        AvatarModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent
   ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ChatService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }