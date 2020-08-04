import { TestBed } from '@angular/core/testing';

import { InfringementService } from './infringement.service';

describe('InfringementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfringementService = TestBed.get(InfringementService);
    expect(service).toBeTruthy();
  });
});
