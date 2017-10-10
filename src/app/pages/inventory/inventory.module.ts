import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InInventoryComponent } from './in-inventory/in-inventory.component';
import {OutInventoryComponent} from './out-inventory/out-inventory.component';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule
  ],
  declarations: [InInventoryComponent, OutInventoryComponent]
})
export class InventoryModule { }
