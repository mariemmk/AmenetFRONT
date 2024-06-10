import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBudgetComponent } from './gestion-budget.component';

describe('GestionBudgetComponent', () => {
  let component: GestionBudgetComponent;
  let fixture: ComponentFixture<GestionBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionBudgetComponent]
    });
    fixture = TestBed.createComponent(GestionBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
