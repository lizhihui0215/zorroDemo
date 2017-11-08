import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import {RoleManagerComponent} from './role-manager/role-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'role', pathMatch: 'full'},
  { path: 'role', component: RoleManagerComponent, pathMatch: 'full' },
  { path: 'user', component: UserManagerComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuManagerComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
