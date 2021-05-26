import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientOrderComponent } from './list-client-order.component';

describe('ListClientOrderComponent', () => {
  let component: ListClientOrderComponent;
  let fixture: ComponentFixture<ListClientOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListClientOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClientOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
