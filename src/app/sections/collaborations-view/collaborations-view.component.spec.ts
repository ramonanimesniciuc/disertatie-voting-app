import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborationsViewComponent } from './collaborations-view.component';

describe('CollaborationsViewComponent', () => {
  let component: CollaborationsViewComponent;
  let fixture: ComponentFixture<CollaborationsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborationsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
