import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InfringementwebSharedModule } from 'app/shared/shared.module';
import { VehicleComponent } from './vehicle.component';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { VehicleUpdateComponent } from './vehicle-update.component';
import { VehicleDeleteDialogComponent } from './vehicle-delete-dialog.component';
import { vehicleRoute } from './vehicle.route';
import { CommonModule } from '@angular/common';
import { JhMaterialModule } from 'app/jh-material.module';

@NgModule({
  imports: [CommonModule, JhMaterialModule, InfringementwebSharedModule, RouterModule.forChild(vehicleRoute)],
  declarations: [VehicleComponent, VehicleDetailComponent, VehicleUpdateComponent, VehicleDeleteDialogComponent],
  entryComponents: [VehicleDeleteDialogComponent],
})
export class InfringementwebVehicleModule {}
