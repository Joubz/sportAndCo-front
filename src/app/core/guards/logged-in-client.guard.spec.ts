import { TestBed } from '@angular/core/testing';

import { LoggedInClientGuard } from './logged-in-client.guard';

describe('LoggedInClientGuard', () => {
  let guard: LoggedInClientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedInClientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
