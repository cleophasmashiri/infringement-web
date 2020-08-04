import { Routes } from '@angular/router';
import { DriverMainComponent } from './driver-main/driver-main.component';
import { DriverTasksComponent } from './driver-tasks/driver-tasks.component';
import { TaskViewComponent } from 'app/bpm-process/task-view/task-view.component';
import { DriverInfringementsComponent } from './driver-infringements/driver-infringements.component';
import { DriverDemeritComponent } from './driver-demerit/driver-demerit.component';

export const driversRoutes: Routes = [
  {
    path: '',
    component: DriverMainComponent,
    children: [
      { path: 'tasks', component: DriverTasksComponent },
      { path: 'tasks/:id', component: TaskViewComponent },
      { path: 'infringements', component: DriverInfringementsComponent },
      { path: 'demerit', component: DriverDemeritComponent },
    ],
  },
];
