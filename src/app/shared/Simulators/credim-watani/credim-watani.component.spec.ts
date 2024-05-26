import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredimWataniComponent } from './credim-watani.component';

describe('CredimWataniComponent', () => {
  let component: CredimWataniComponent;
  let fixture: ComponentFixture<CredimWataniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredimWataniComponent]
    });
    fixture = TestBed.createComponent(CredimWataniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
