import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterRegistrationComponent } from './renter-registration.component';

describe('RenterRegistrationComponent', () => {
  let component: RenterRegistrationComponent;
  let fixture: ComponentFixture<RenterRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenterRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
