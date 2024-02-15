import { TestBed } from '@angular/core/testing';

import { CantidadServiceService } from './cantidad-service.service';

describe('CantidadServiceService', () => {
  let service: CantidadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CantidadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
