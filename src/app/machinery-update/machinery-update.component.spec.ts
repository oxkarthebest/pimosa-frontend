import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryUpdateComponent } from './machinery-update.component';

describe('MachineryUpdateComponent', () => {
  let component: MachineryUpdateComponent;
  let fixture: ComponentFixture<MachineryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
