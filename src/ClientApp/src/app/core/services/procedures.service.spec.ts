import { TestBed } from '@angular/core/testing';

import { ProceduresService } from './procedures.service';

describe('ProceduresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProceduresService = TestBed.get(ProceduresService);
    expect(service).toBeTruthy();
  });
});
