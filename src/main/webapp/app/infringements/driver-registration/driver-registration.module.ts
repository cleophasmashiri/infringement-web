import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JhMaterialModule } from 'app/jh-material.module';
import { InfringementwebSharedLibsModule } from 'app/shared/shared-libs.module';
import { RouterModule } from '@angular/router';
import { driverRegistrationRoutes } from './driver-registration-routing.module';
import { DriverRegistrationComponent } from './driver-registration.component';

@NgModule({
  imports: [CommonModule, JhMaterialModule, InfringementwebSharedLibsModule, RouterModule.forChild(driverRegistrationRoutes)],
  declarations: [DriverRegistrationComponent],
})
export class DriverRegistrationModule {}
