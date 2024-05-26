import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreslaireAmenagementComponent } from './preslaire-amenagement.component';

describe('PreslaireAmenagementComponent', () => {
  let component: PreslaireAmenagementComponent;
  let fixture: ComponentFixture<PreslaireAmenagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreslaireAmenagementComponent]
    });
    fixture = TestBed.createComponent(PreslaireAmenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
