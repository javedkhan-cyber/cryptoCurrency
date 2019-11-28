import { TestBed } from '@angular/core/testing';

import { CryptoserviceService } from './cryptoservice.service';

describe('CryptoserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptoserviceService = TestBed.get(CryptoserviceService);
    expect(service).toBeTruthy();
  });
});
