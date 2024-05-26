import { TestBed } from '@angular/core/testing';

import { SimulateurService } from './simulateur.service';

describe('SimulateurService', () => {
  let service: SimulateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
