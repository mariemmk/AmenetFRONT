import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigProfileComponent } from './config-profile.component';

describe('ConfigProfileComponent', () => {
  let component: ConfigProfileComponent;
  let fixture: ComponentFixture<ConfigProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigProfileComponent]
    });
    fixture = TestBed.createComponent(ConfigProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
