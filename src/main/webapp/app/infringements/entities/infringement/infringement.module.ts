import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InfringementwebSharedModule } from 'app/shared/shared.module';
import { InfringementComponent } from './infringement.component';
import { InfringementDetailComponent } from './infringement-detail.component';
import { InfringementUpdateComponent } from './infringement-update.component';
import { InfringementDeleteDialogComponent } from './infringement-delete-dialog.component';
import { infringementRoute } from './infringement.route';

@NgModule({
  imports: [InfringementwebSharedModule, RouterModule.forChild(infringementRoute)],
  declarations: [InfringementComponent, InfringementDetailComponent, InfringementUpdateComponent, InfringementDeleteDialogComponent],
  entryComponents: [InfringementDeleteDialogComponent],
})
export class InfringementwebInfringementModule {}
