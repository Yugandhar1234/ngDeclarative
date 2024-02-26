import { TestBed } from '@angular/core/testing';

import { DecService } from './dec.service';

describe('DecService', () => {
  let service: DecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
