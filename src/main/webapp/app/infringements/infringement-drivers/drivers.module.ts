import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverMainComponent } from './driver-main/driver-main.component';
import { DriverTasksComponent } from './driver-tasks/driver-tasks.component';
import { JhMaterialModule } from 'app/jh-material.module';
import { InfringementwebSharedLibsModule } from 'app/shared/shared-libs.module';
import { RouterModule } from '@angular/router';
import { driversRoutes } from './drivers-routing.module';
import { DriverInfringementsComponent } from './driver-infringements/driver-infringements.component';
import { DriverDemeritComponent } from './driver-demerit/driver-demerit.component';

@NgModule({
  declarations: [DriverMainComponent, DriverTasksComponent, DriverInfringementsComponent, DriverDemeritComponent],
  imports: [CommonModule, JhMaterialModule, InfringementwebSharedLibsModule, RouterModule.forChild(driversRoutes)],
})
export class DriversModule {}
