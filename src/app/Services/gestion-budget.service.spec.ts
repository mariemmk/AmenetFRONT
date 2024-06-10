import { TestBed } from '@angular/core/testing';

import { GestionBudgetService } from './gestion-budget.service';

describe('GestionBudgetService', () => {
  let service: GestionBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
