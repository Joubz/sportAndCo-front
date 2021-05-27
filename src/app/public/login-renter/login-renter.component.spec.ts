import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRenterComponent } from './login-renter.component';

describe('LoginRenterComponent', () => {
  let component: LoginRenterComponent;
  let fixture: ComponentFixture<LoginRenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
