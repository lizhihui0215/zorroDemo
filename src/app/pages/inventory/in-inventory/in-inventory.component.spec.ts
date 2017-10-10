import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InInventoryComponent } from './in-inventory.component';

describe('InInventoryComponent', () => {
  let component: InInventoryComponent;
  let fixture: ComponentFixture<InInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
