import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekroutineComponent } from './weekroutine.component';

describe('WeekroutineComponent', () => {
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
