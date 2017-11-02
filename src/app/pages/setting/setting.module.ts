import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule.forRoot(),
    SettingRoutingModule
  ],
  declarations: [UserManagerComponent, MenuManagerComponent]
})
export class SettingModule { }
