import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from './response';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import {Service} from './service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService extends Service {
  get isLoggedin(): boolean {
    const user: User = this.localStorageService.get<User>('user');
    if (user != null ) { return user.rememberMe; }
    return false;
  }

  constructor(private localStorageService: LocalStorageService, private http: HttpClient) {
    super();
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

    return this.http.post<Response<User>>('http://localhost:8080/auth/signin', body.toString(), options).do(response => {
      const res = response.results;
      this.localStorageService.set('user', res);
    });
  }

  logout(): Observable<Response<string>> {
    this.localStorageService.remove('user');
    return this.http.get<Response<string>>('http://localhost:8080/auth/signout', {withCredentials: true});
  }

  signup(user: User): Observable<Response<string>> {
    return this.http.post<Response<string>>('http://localhost:8080/auth/signup', user);
  }

  isAuthenticated(): Observable<Response<boolean>> {
    const user: User = this.localStorageService.get<User>('user');
    if (user == null) {
      return Observable.of(new Response('success', 1001, false));
    }
    return this.http.get<Response<boolean>>('http://localhost:8080/auth/isAuthenticated',
      {withCredentials: true});
  }
}
