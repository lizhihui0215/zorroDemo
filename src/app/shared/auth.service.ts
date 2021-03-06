import { Inject, Injectable } from '@angular/core';
import { User } from '../model/user';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from './response';
import { URLSearchParams } from '@angular/http';

import {Service} from './service';


import { SERVER_URL } from './server-url';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService extends Service {
  private authURL: string;

  get isLoggedin(): boolean {
    const user: User = this.localStorageService.get<User>('user');
    if (user != null ) { return user.rememberMe; }
    return false;
  }

  constructor(private localStorageService: LocalStorageService, private http: HttpClient, @Inject(SERVER_URL) public serverURL: string) {
    super();
    this.authURL = `${serverURL}/auth`;
  }

  login(username: string, password: string, rememberMe: boolean): Observable<Response<User>> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('rememberMe', String(rememberMe));

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
      withCredentials: true
    };

    return this.http.post<Response<User>>(`${this.authURL}/signin`, body.toString(), options).do(response => {
      const res = response.results;
      this.localStorageService.set('user', res);
    });
  }

  logout(): Observable<Response<string>> {
    this.localStorageService.remove('user');
    return this.http.get<Response<string>>(`${this.authURL}/signout`, {withCredentials: true});
  }

  signup(user: User): Observable<Response<string>> {
    return this.http.post<Response<string>>(`${this.authURL}/signup`, user);
  }

  isAuthenticated(): Observable<Response<boolean>> {
    const user: User = this.localStorageService.get<User>('user');
    if (user == null) {
      return Observable.of(new Response('success', 1001, false));
    }
    return this.http.get<Response<boolean>>(`${this.authURL}/isAuthenticated`,
      {withCredentials: true});
  }
}
