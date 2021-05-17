import { TestBed } from '@angular/core/testing';

import { MetropolisesService } from './metropolises.service';

describe('MetropolisesService', () => {
  let service: MetropolisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetropolisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
