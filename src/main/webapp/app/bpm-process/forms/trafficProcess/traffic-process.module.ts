import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewInfringementComponent } from './new-infringement.component';
import { DriverInfringementComponent } from './driver-infringement.component';
import { TrafficAdminInfringementComponent } from './traffic-admin-infringement.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JhMaterialModule } from 'app/jh-material.module';

@NgModule({
  entryComponents: [NewInfringementComponent, DriverInfringementComponent, TrafficAdminInfringementComponent],
  declarations: [NewInfringementComponent, DriverInfringementComponent, TrafficAdminInfringementComponent],
  imports: [FormsModule, CommonModule, RouterModule, JhMaterialModule],
  exports: [NewInfringementComponent, DriverInfringementComponent, TrafficAdminInfringementComponent],
})
export class TrafficProcessModule {}

export { NewInfringementComponent } from './new-infringement.component';
export { DriverInfringementComponent } from './driver-infringement.component';
export { TrafficAdminInfringementComponent } from './traffic-admin-infringement.component';
