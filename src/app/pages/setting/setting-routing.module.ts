import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full'},
  { path: 'user', component: UserManagerComponent, pathMatch: 'full' },
  { path: 'menu', component: MenuManagerComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
