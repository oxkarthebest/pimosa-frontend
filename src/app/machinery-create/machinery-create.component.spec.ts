import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineryCreateComponent } from './machinery-create.component';

describe('MachineryCreateComponent', () => {
  let component: MachineryCreateComponent;
  let fixture: ComponentFixture<MachineryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
