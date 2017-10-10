import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutInventoryComponent } from './out-inventory.component';

describe('OutInventoryComponent', () => {
  let component: OutInventoryComponent;
  let fixture: ComponentFixture<OutInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
