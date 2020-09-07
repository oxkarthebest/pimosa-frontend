import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryInformationComponent } from './machinery-information.component';

describe('MachineryInformationComponent', () => {
  let component: MachineryInformationComponent;
  let fixture: ComponentFixture<MachineryInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
