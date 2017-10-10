import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InInventoryComponent } from './in-inventory/in-inventory.component';

const routes: Routes = [
  // {
    // path: 'inventory',
    // children: [
      { path: '', redirectTo: 'inInventory', pathMatch: 'full'},
      { path: 'inInventory', component: InInventoryComponent, pathMatch: 'full' },
    // ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
