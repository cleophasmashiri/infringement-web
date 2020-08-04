import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTasksComponent } from './driver-tasks.component';

describe('DriverTasksComponent', () => {
  let component: DriverTasksComponent;
  let fixture: ComponentFixture<DriverTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DriverTasksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
