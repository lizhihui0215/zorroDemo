import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    console.log('logout');
    this.authService.logout();
    this.router.navigate(['signin']);
  }

  menuTo(menu: String) {
    if ('dashboard' === menu) {
      this.router.navigate(['pages', 'dashboard']);
    }else if ('in-inventory' === menu) {
      this.router.navigate(['pages', 'inventory', 'in-inventory']);
    }else if ('out-inventory' === menu) {
      this.router.navigate(['pages', 'inventory', 'out-inventory']);
    }
  }
}
