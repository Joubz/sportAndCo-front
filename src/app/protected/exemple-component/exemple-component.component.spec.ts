import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExempleComponentComponent } from './exemple-component.component';

describe('ExempleComponentComponent', () => {
  let component: ExempleComponentComponent;
  let fixture: ComponentFixture<ExempleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExempleComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExempleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
