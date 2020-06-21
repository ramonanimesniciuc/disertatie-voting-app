import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeProjectsComponent } from './theme-projects.component';

describe('ThemeProjectsComponent', () => {
  let component: ThemeProjectsComponent;
  let fixture: ComponentFixture<ThemeProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
