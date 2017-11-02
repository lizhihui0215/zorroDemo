import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  isCollapsed = false;

  constructor(private authService: AuthService, private router: Router, private confirmServ: NzModalService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe(response => {
      if (response.code === 1001) {
        this.router.navigate(['signin']);
      }else {
        this.confirmServ.error({title: '错误！', content: response.message, okText: 'OK'});
      }
    }, error => {
      this.confirmServ.error({title: '错误！', content: error.message, okText: 'OK'});
    });
  }
}
