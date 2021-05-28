import { TestBed } from '@angular/core/testing';

import { LoggedInRenterGuard } from './logged-in-renter.guard';

describe('LoggedInRenterGuard', () => {
  let guard: LoggedInRenterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedInRenterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
