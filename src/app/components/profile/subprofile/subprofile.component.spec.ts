import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprofileComponent } from './subprofile.component';

describe('SubprofileComponent', () => {
  let component: SubprofileComponent;
  let fixture: ComponentFixture<SubprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
