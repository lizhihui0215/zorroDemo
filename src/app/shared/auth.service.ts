import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AuthService {
  get isLoggedin(): boolean {
    return this.localStorageService.get('user') != null;
  }

  constructor(private localStorageService: LocalStorageService) { }

  login(username: string, password: string) {
    const user = new User(username, password, '');
    this.localStorageService.set('user', user);
  }

  logout() {
    this.localStorageService.remove('user');
  }

}
