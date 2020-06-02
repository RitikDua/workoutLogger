import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsetsComponent } from './addsets.component';

describe('AddsetsComponent', () => {
  let component: AddsetsComponent;
  let fixture: ComponentFixture<AddsetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
