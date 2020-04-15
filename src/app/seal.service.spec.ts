import { TestBed } from '@angular/core/testing';

import { SealService } from './seal.service';

describe('SealService', () => {
  let service: SealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
