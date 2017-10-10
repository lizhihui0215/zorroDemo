import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from './response';
import { Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class AuthService {
  get isLoggedin(): boolean {
    return this.localStorageService.get('user') != null;
  }

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) { }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post<Response<User>>('http://localhost:8080/login/auth', body.toString(), options).subscribe(
      response => {
        let res = response.result;
        this.localStorageService.set('user', res);
      },
      error => {
        console.log('Error occured' + error);
      }
    );
  }

  logout() {
    this.localStorageService.remove('user');
  }

}
