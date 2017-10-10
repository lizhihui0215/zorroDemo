import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InInventoryComponent } from './in-inventory/in-inventory.component';
import {OutInventoryComponent} from './out-inventory/out-inventory.component';

const routes: Routes = [
  { path: '', redirectTo: 'in-inventory', pathMatch: 'full'},
  { path: 'in-inventory', component: InInventoryComponent, pathMatch: 'full' },
  { path: 'out-inventory', component: OutInventoryComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
