import { TestBed } from '@angular/core/testing';

import { EquipmentSearchGuard } from './equipment-search.guard';

describe('EquipmentSearchGuard', () => {
  let guard: EquipmentSearchGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EquipmentSearchGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
