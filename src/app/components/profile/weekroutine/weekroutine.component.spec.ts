import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekRoutineComponent } from './weekroutine.component';

describe('WeekRoutineComponent', () => {
  let component: WeekroutineComponent;
  let fixture: ComponentFixture<WeekroutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekroutineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekroutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
