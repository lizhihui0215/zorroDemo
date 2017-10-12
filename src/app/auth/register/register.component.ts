import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateForm: FormGroup;

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }

    if (this.validateForm.valid) {
      this.authService.signup(this.validateForm.value).subscribe(response => {
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

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private confirmServ: NzModalService) {
  }

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.validateForm.controls[ 'checkPassword' ].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  }

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username            : [ null, [ Validators.required ] ],
      name            : [ null, [ Validators.required ] ],
      email            : [ null, [ Validators.email ] ],
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      nickname         : [ null, [ Validators.required ] ],
      phoneNumberPrefix: [ '+86' ],
      phone      : [ null, [ Validators.required ] ],
      brithday          : [ null, [ Validators.required ] ],
      captcha          : [ null, [ Validators.required ] ],
      agree            : [ true ]
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

}
