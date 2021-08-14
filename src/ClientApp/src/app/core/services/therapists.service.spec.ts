import { TestBed } from '@angular/core/testing';

import { TherapistsService } from './therapists.service';

describe('TherapistsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TherapistsService = TestBed.get(TherapistsService);
    expect(service).toBeTruthy();
  });
});
