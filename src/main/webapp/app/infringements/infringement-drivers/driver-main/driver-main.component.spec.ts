import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverMainComponent } from './driver-main.component';

describe('DriverMainComponent', () => {
  let component: DriverMainComponent;
  let fixture: ComponentFixture<DriverMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriverMainComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
