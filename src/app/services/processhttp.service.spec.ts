import { TestBed } from '@angular/core/testing';

import { ProcesshttpService } from './processhttp.service';

describe('ProcesshttpService', () => {
  let service: ProcesshttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesshttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
