import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from './response';
import { Role } from '../model/role';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) { }

  roles(): Observable<Response<[Role]>> {
    return this.http.get<Response<[Role]>>('http://localhost:8081/role/roles', {withCredentials: true});
  }

}
