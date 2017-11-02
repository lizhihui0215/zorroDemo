import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { Response } from './response';

@Injectable()
export class UserService {
  private userURL = 'http://localhost:8081/user';

  constructor(private http: HttpClient) { }

  users(roleId: string): Observable<Response<[User]>> {
    const url = `${this.userURL}/${roleId}`;

    return this.http.get<Response<[User]>>(url, {withCredentials: true});
  }

}
