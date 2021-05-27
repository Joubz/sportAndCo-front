import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRenterComponent } from './accept-renter.component';

describe('AcceptRenterComponent', () => {
  let component: AcceptRenterComponent;
  let fixture: ComponentFixture<AcceptRenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptRenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
