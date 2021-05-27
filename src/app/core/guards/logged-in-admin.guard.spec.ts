import { TestBed } from '@angular/core/testing';

import { LoggedInAdminGuard } from './logged-in-admin.guard';

describe('LoggedInAdminGuard', () => {
  let guard: LoggedInAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedInAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
