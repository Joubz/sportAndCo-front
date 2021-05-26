import { TestBed } from '@angular/core/testing';

import { LoginRenterService } from './login-renter.service';

describe('LoginRenterService', () => {
  let service: LoginRenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
