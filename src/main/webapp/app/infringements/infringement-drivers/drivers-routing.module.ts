import { Routes } from '@angular/router';
import { DriverMainComponent } from './driver-main/driver-main.component';
import { TaskViewComponent } from 'app/bpm-process/task-view/task-view.component';
import { DriverDemeritComponent } from './driver-demerit/driver-demerit.component';
import { TasklistComponent } from 'app/bpm-process/tasklist/tasklist.component';
import { InfringementComponent } from '../entities/infringement/infringement.component';
import { DriverUpdateComponent } from '../entities/driver/driver-update.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';

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
      {
        path: 'tasks',
        component: TasklistComponent,
        canActivate: [UserRouteAccessService],
        data: {
          authorities: [Authority.USER],
        },
      },
      {
        path: 'tasks/:id',
        component: TaskViewComponent,
        canActivate: [UserRouteAccessService],
        data: {
          authorities: [Authority.USER],
        },
      },
      {
        path: 'infringements',
        component: InfringementComponent,
        canActivate: [UserRouteAccessService],
        data: {
          authorities: [Authority.USER],
        },
      },
      {
        path: 'demerit',
        component: DriverDemeritComponent,
        canActivate: [UserRouteAccessService],
        data: {
          authorities: [Authority.USER],
        },
      },
      {
        path: 'info',
        component: DriverUpdateComponent,
        canActivate: [UserRouteAccessService],
        data: {
          authorities: [Authority.USER],
        },
      },
    ],
  },
];
