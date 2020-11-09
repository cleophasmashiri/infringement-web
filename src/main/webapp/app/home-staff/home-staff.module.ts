import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfringementwebDashboardModule } from 'app/dashboard/dashboard.module';
import { InfringementwebSharedModule } from 'app/shared/shared.module';
import { HomeStaffComponent } from './home-staff.component';
import { HOME_STAFF_ROUTE } from './home-staff.route';

@NgModule({
  imports: [InfringementwebSharedModule, RouterModule.forChild([HOME_STAFF_ROUTE]), InfringementwebDashboardModule],
  declarations: [HomeStaffComponent],
})
export class InfringementwebHomeStaffModule {}
