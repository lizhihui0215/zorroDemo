import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from './response';
import { Role } from '../model/role';
import { SERVER_URL } from './server-url';

@Injectable()
export class RoleService {

  private roleURL: string;

  constructor(private http: HttpClient, @Inject(SERVER_URL) public serverURL: string) {
    this.roleURL = `${serverURL}/role`;
  }

  roles(): Observable<Response<[Role]>> {
    return this.http.get<Response<[Role]>>(`${this.roleURL}/roles`, {withCredentials: true});
  }

}
