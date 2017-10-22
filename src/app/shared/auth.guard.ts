import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Response } from './response';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  constructor(private router: Router, private authService: AuthService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const auth: Observable<Response<boolean>> = this.authService.isAuthenticated();

    return auth.do(response => {
      if (!response.results) { this.router.navigate(['signin']); }
    }, error => {
      this.router.navigate(['signin']);
    }).map((response) => {
      return response.results;
    });
  }
}
