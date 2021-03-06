﻿ import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@app/models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    
    login(email: string, password: string) {
        return this.http.post<any>('https://localhost:44378/api/authenticate/login', { email, password })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user.data));
                this.currentUserSubject.next(user.data);
                return user;
            }));
    }

    register(userClient: User) {
        return this.http.post<any>('https://localhost:44378/api/authenticate/register', userClient)
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            this.currentUserSubject.next(user.data);
            return user;
        }));
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        window.location.reload();
    }
}