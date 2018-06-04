import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {

  validateForm: FormGroup;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }

    if (this.validateForm.valid) {
      const username = this.validateForm.controls.userName.value;
      const password = this.validateForm.controls.password.value;
      const rememberMe = this.validateForm.controls.rememberMe.value;
      this.authService.login(username, password, rememberMe).subscribe(response => {
        if (response.code === 1001) {
          this.router.navigate(['pages']);
        }else {
          this.confirmServ.error({
            nzTitle: '错误',
            nzContent: response.message,
            nzOkText: 'OK',
          });
        }
      }, error => {
        this.confirmServ.error({
          nzTitle: '错误',
          nzContent: error.message,
          nzOkText: 'OK',
        });
      });
    }
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private confirmServ: NzModalService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      rememberMe: [ true ],
    });
  }

}
