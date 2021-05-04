import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomRenterComponentComponent } from './random-renter-component.component';

describe('RandomRenterComponentComponent', () => {
  let component: RandomRenterComponentComponent;
  let fixture: ComponentFixture<RandomRenterComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomRenterComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomRenterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
