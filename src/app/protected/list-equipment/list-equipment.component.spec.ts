import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEquipmentComponent } from './list-equipment.component';

describe('ListEquipmentComponent', () => {
  let component: ListEquipmentComponent;
  let fixture: ComponentFixture<ListEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
