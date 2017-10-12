import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from './response';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  get isLoggedin(): boolean {
    return this.localStorageService.get('user') != null;
  }

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) { }

  login(username: string, password: string): Observable<Response<User>> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('remember', 'false');

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post<Response<User>>('http://localhost:8080/auth/signin', body.toString(), options).do(response => {
      const res = response.results;
      this.localStorageService.set('user', res);
    });
  }

  logout() {
    this.localStorageService.remove('user');
  }

  signup(user: User): Observable<Response<string>> {
    return this.http.post<Response<string>>('http://localhost:8080/auth/signup', user);
  }
}
