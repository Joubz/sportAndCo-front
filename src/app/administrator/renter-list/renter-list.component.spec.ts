import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterListComponent } from './renter-list.component';

describe('RenterListComponent', () => {
  let component: RenterListComponent;
  let fixture: ComponentFixture<RenterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
