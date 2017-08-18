import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiginComponent } from './sigin/sigin.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'sigin', component: SiginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
