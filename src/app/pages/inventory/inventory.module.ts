import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InInventoryComponent } from './in-inventory/in-inventory.component';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule
  ],
  declarations: [InInventoryComponent]
})
export class InventoryModule { }
