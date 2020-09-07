import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMachineryComponent } from './project-machinery.component';

describe('ProjectMachineryComponent', () => {
  let component: ProjectMachineryComponent;
  let fixture: ComponentFixture<ProjectMachineryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMachineryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMachineryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
