import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreditsComponent } from './list-credits.component';

describe('ListCreditsComponent', () => {
  let component: ListCreditsComponent;
  let fixture: ComponentFixture<ListCreditsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCreditsComponent]
    });
    fixture = TestBed.createComponent(ListCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
