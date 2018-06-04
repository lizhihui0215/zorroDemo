import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Response } from './response';
import { SERVER_URL } from './server-url';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {
  private userURL: string;

  constructor(private http: HttpClient, @Inject(SERVER_URL) public serverURL: string) {
    this.userURL = `${serverURL}/user`;
  }

  users(roleId: number): Observable<Response<[User]>> {
    const url = `${this.userURL}/${roleId}`;
    return this.http.get<Response<[User]>>(url, {withCredentials: true});
  }

}
