import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryDashboardComponent } from './machinery-dashboard.component';

describe('MachineryDashboardComponent', () => {
  let component: MachineryDashboardComponent;
  let fixture: ComponentFixture<MachineryDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
