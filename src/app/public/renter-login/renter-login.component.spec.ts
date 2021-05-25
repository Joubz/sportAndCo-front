import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterLoginComponent } from './renter-login.component';

describe('RenterLoginComponent', () => {
  let component: RenterLoginComponent;
  let fixture: ComponentFixture<RenterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenterLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
