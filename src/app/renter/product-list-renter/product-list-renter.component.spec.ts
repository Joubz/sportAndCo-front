import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListRenterComponent } from './product-list-renter.component';

describe('ProductListRenterComponent', () => {
  let component: ProductListRenterComponent;
  let fixture: ComponentFixture<ProductListRenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListRenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
