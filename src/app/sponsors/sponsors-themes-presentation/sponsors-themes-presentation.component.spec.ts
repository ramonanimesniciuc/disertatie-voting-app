import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsThemesPresentationComponent } from './sponsors-themes-presentation.component';

describe('SponsorsThemesPresentationComponent', () => {
  let component: SponsorsThemesPresentationComponent;
  let fixture: ComponentFixture<SponsorsThemesPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorsThemesPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsThemesPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
