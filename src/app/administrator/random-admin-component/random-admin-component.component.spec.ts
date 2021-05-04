import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomAdminComponentComponent } from './random-admin-component.component';

describe('RandomAdminComponentComponent', () => {
  let component: RandomAdminComponentComponent;
  let fixture: ComponentFixture<RandomAdminComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomAdminComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomAdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
