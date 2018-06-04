import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {RoleService} from '../../../shared/role.service';
import {UserService} from '../../../shared/user.service';
import {User} from '../../../model/user';

@Component({
  selector: 'app-user-selected',
  templateUrl: './user-selected.component.html',
  styleUrls: ['./user-selected.component.css']
})
export class UserSelectedComponent implements OnInit {

   private _roleId: number;

  @Output('change') change = new EventEmitter();
  @Output() usersChanged = new EventEmitter<User[]>();

  users: User[] = [];

  isVisible = false;
  isConfirmLoading = false;

  constructor(private userService: UserService,
              private roleService: RoleService,
              private confirmServ: NzModalService) { }

  ngOnInit() {
  }

  get roleId(): number {
    return this._roleId;
  }

  test(roleId: number) {
    this.userService.users(roleId).subscribe(response => {
      if (response.code === 1001) {
        this.users = response.results;
        this.usersChanged.emit(this.users);
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

  @Input('roleId')
  set roleId(value: number) {
    if (value != null) {
      this.test(value);
    }
    this._roleId = value;
  }

  modal(isShow: boolean, event) {
    this.isVisible = isShow;
  }

  handleOk(e) {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(e) {
    this.isVisible = false;
  }

}
