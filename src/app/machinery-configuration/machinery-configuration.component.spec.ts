import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryConfigurationComponent } from './machinery-configuration.component';

describe('MachineryConfigurationComponent', () => {
  let component: MachineryConfigurationComponent;
  let fixture: ComponentFixture<MachineryConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
