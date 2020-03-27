import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostVotedProjectComponent } from './most-voted-project.component';

describe('MostVotedProjectComponent', () => {
  let component: MostVotedProjectComponent;
  let fixture: ComponentFixture<MostVotedProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostVotedProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostVotedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
