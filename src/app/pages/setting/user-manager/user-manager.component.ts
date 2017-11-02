import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { RoleService } from '../../../shared/role.service';
import { Role } from '../../../model/role';
import { Response } from '../../../shared/response';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../model/user';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
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
  selectedRole: Role;


  constructor(private userService: UserService,
              private roleService: RoleService,
              private confirmServ: NzModalService) {
    const rolesObservable: Observable<Response<[Role]>> = this.roleService.roles();
    rolesObservable.do(response => {
      if (response.code === 1001) {
        this.roles = response.results;
      }else {
        this.confirmServ.error({title: '错误！', content: response.message, okText: 'OK'});
      }
    });

    rolesObservable.switchMap(response => {
      const roles = response.results;
      this.roles = roles;
      this.selectedRole = this.roles[0];
      return this.userService.users(this.selectedRole.id);
    }).subscribe(response => {
      if (response.code === 1001) {
        this.users = response.results;
        this.copyData = [...this.users];
        this.filterAddressArray = this.users.map(function (user) {
          return {name: user.address, value: false};
        });
      }else {
        this.confirmServ.error({title: '错误！', content: response.message, okText: 'OK'});
      }
    }, error => {
      this.confirmServ.error({title: '错误！', content: error.message, okText: 'OK'});
    });
  }

  ngOnInit() {
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
    this.userService.users(role.id).subscribe(response => {
      if (response.code === 1001) {
        this.users = response.results;
        this.copyData = [...this.users];
        this.filterAddressArray = this.users.map(function (user) {
          return {name: user.address, value: false};
        });
      }else {
        this.confirmServ.error({title: '错误！', content: response.message, okText: 'OK'});
      }
    }, error => {
      this.confirmServ.error({title: '错误！', content: error.message, okText: 'OK'});
    });
  }

  isRoleSelected(role: Role): boolean {
    return this.selectedRole === role;
  }

  test() {
    console.log('test');
  }
}
