import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminsComponent } from './main-admins/main-admins.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { TaskViewComponent } from 'app/bpm-process/task-view/task-view.component';
import { StartProcessComponent } from 'app/bpm-process/start-process/start-process.component';
import { InfringementComponent } from '../entities/infringement/infringement.component';
import { DriverComponent } from '../entities/driver/driver.component';
import { VehicleComponent } from '../entities/vehicle/vehicle.component';
import { TasklistComponent } from 'app/bpm-process/tasklist/tasklist.component';

const routes: Routes = [
  {
    path: '',
    component: MainAdminsComponent,
    data: {
      authorities: [Authority.INFRINGEMENT_ADMIN],
      pageTitle: 'infringementwebApp.infringements.admins.title',
    },
    children: [
      { path: 'tasks', component: TasklistComponent },
      { path: 'tasks/:id', component: TaskViewComponent },
      { path: 'startprocess/:processdefinitionkey', component: StartProcessComponent },
      { path: 'list', component: InfringementComponent },
      { path: 'drivers', component: DriverComponent },
      { path: 'vehicles', component: VehicleComponent },
    ],
  },
];

// links = [{name: 'Tasks', url: '/admins/tasks'}, {name: 'Create Infringement', url: '/admins/startprocess/trafficProcess'}, {name: 'Infringements', url: '/admins/infringements'}, {name: 'Drivers', url: '/admins/drivers'}, {name: 'Vehicles', url: '/admins/vehicles'} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule {}
