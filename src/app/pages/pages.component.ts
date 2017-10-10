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
    this.router.navigate(['sigin']);
  }

  menuTo(menu: String) {
    if ('dashboard' === menu) {
      this.router.navigate(['dashboard']);
    }else if ('inInventory' === menu) {
      this.router.navigate(['inventory', 'inInventory']);
    }
  }
}
