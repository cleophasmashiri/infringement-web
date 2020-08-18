import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InfringementwebSharedModule } from 'app/shared/shared.module';
import { DriverComponent } from './driver.component';
import { DriverDetailComponent } from './driver-detail.component';
import { DriverUpdateComponent } from './driver-update.component';
import { DriverDeleteDialogComponent } from './driver-delete-dialog.component';
import { driverRoute } from './driver.route';
import { CommonModule } from '@angular/common';
import { JhMaterialModule } from 'app/jh-material.module';
import { AccountModule } from 'app/account/account.module';
import { RegisterDriverComponent } from './register-driver.component';

@NgModule({
  imports: [CommonModule, JhMaterialModule, InfringementwebSharedModule, RouterModule.forChild(driverRoute), AccountModule],
  declarations: [DriverComponent, DriverDetailComponent, DriverUpdateComponent, DriverDeleteDialogComponent, RegisterDriverComponent],
  entryComponents: [DriverDeleteDialogComponent],
})
export class InfringementwebDriverModule {}
