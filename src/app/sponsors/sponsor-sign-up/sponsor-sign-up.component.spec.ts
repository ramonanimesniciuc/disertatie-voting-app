import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorSignUpComponent } from './sponsor-sign-up.component';

describe('SponsorSignUpComponent', () => {
  let component: SponsorSignUpComponent;
  let fixture: ComponentFixture<SponsorSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
