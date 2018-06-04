import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { RoleService } from '../../../shared/role.service';
import { Role } from '../../../model/role';
import { Response } from '../../../shared/response';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { User } from '../../../model/user';

import {UserSelectedComponent} from '../../shared/user-selected/user-selected.component';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.css']
})
export class RoleManagerComponent implements OnInit {
  @ViewChild(UserSelectedComponent)
  private userSelectedComponent: UserSelectedComponent;

  searchValue = '';
  filterAddressArray = [];
  sortMap = {
    username    : null,
    name   : null,
    address: null
  };
  sortName = null;
  sortValue = null;
  roles: Role[] = [];
  users: User[] = [];
  copyData: User[] = [];
  selectedRole: Role = new Role();

  private isHidden: boolean;


  constructor(private userService: UserService,
              private roleService: RoleService,
              private confirmServ: NzModalService) {
    const rolesObservable: Observable<Response<[Role]>> = this.roleService.roles();
    rolesObservable.subscribe(response => {
      if (response.code === 1001) {
          this.roles = response.results;
          this.selectedRole = this.roles[0];
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

  ngOnInit() {
  }

  onUsersChanged(users: User[]) {
    this.users = users;
  }

  sort(sortName, value) {
    this.sortName = sortName;
    this.sortValue = value;
    Object.keys(this.sortMap).forEach(key => {
      if (key !== sortName) {
        this.sortMap[ key ] = null;
      } else {
        this.sortMap[ key ] = value;
      }
    });
    this.search();
  }

  search() {
    const searchAddress = this.filterAddressArray.filter(address => address.value);
    const filterFunc = (item) => {
      return (searchAddress.length ? searchAddress.some(address => item.address.indexOf(address.name) !== -1) : true) &&
        (item.name.indexOf(this.searchValue) !== -1);
    };
    this.users = [ ...this.copyData.filter(item => filterFunc(item)) ];
    this.users = [ ...this.users.sort((a, b) => {
      if (a[ this.sortName ] > b[ this.sortName ]) {
        return (this.sortValue === 'ascend') ? 1 : -1;
      } else if (a[ this.sortName ] < b[ this.sortName ]) {
        return (this.sortValue === 'ascend') ? -1 : 1;
      } else {
        return 0;
      }
    }) ];
  }

  reset(array) {
    array.forEach(item => {
      item.value = false;
    });
    this.search();
  }

  roleClick(role: Role) {
    this.selectedRole = role;
  }

  isRoleSelected(role: Role): boolean {
    return this.selectedRole === role;
  }

  test(event) {
    this.isHidden = !this.isHidden;
    this.userSelectedComponent.modal(this.isHidden, event);
  }

}
