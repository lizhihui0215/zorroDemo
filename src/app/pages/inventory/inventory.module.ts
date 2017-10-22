import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InInventoryComponent } from './in-inventory/in-inventory.component';
import {OutInventoryComponent} from './out-inventory/out-inventory.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [InInventoryComponent, OutInventoryComponent]
})
export class InventoryModule { }
