import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminsComponent } from './main-admins/main-admins.component';
import { Authority } from 'app/shared/constants/authority.constants';
import { TaskViewComponent } from 'app/bpm-process/task-view/task-view.component';
import { StartProcessComponent } from 'app/bpm-process/start-process/start-process.component';
import { InfringementComponent } from '../entities/infringement/infringement.component';
import { DriverComponent } from '../entities/driver/driver.component';
import { VehicleComponent } from '../entities/vehicle/vehicle.component';
import { TasklistComponent } from 'app/bpm-process/tasklist/tasklist.component';
import { DriverResolve } from '../entities/driver/driver.route';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

const routes: Routes = [
  {
    path: '',
    component: MainAdminsComponent,
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
        path: 'startprocess/:processdefinitionkey',
        component: StartProcessComponent,
        canActivate: [UserRouteAccessService],
        data: {
          authorities: [Authority.USER],
        },
      },
      {
        path: 'list',
        component: InfringementComponent,
        canActivate: [UserRouteAccessService],
        data: {
          authorities: [Authority.USER],
        },
      },
      {
        path: 'drivers',
        component: DriverComponent,
        canActivate: [UserRouteAccessService],
        data: {
          authorities: [Authority.USER],
        },
      },
      {
        path: 'vehicles',
        component: VehicleComponent,
        resolve: {
          driver: DriverResolve,
        },
        data: {
          authorities: [Authority.USER],
          pageTitle: 'infringementwebApp.vehicle.home.title',
        },
      },
    ],
  },
];

// links = [{name: 'Tasks', url: '/admins/tasks'}, {name: 'Create Infringement', url: '/admins/startprocess/trafficProcess'}, {name: 'Infringements', url: '/admins/infringements'}, {name: 'Drivers', url: '/admins/drivers'}, {name: 'Vehicles', url: '/admins/vehicles'} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule {}
