import { Routes } from '@angular/router';
import { DriverMainComponent } from './driver-main/driver-main.component';
import { TaskViewComponent } from 'app/bpm-process/task-view/task-view.component';
import { DriverDemeritComponent } from './driver-demerit/driver-demerit.component';
import { TasklistComponent } from 'app/bpm-process/tasklist/tasklist.component';
import { InfringementComponent } from '../entities/infringement/infringement.component';
import { DriverUpdateComponent } from '../entities/driver/driver-update.component';

export const driversRoutes: Routes = [
  {
    path: '',
    component: DriverMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      { path: 'tasks', component: TasklistComponent },
      { path: 'tasks/:id', component: TaskViewComponent },
      { path: 'infringements', component: InfringementComponent },
      { path: 'demerit', component: DriverDemeritComponent },
      { path: 'info', component: DriverUpdateComponent },
    ],
  },
];
