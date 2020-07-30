import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InfringementwebSharedModule } from 'app/shared/shared.module';
import { InfringementActionComponent } from './infringement-action.component';
import { InfringementActionDetailComponent } from './infringement-action-detail.component';
import { InfringementActionUpdateComponent } from './infringement-action-update.component';
import { InfringementActionDeleteDialogComponent } from './infringement-action-delete-dialog.component';
import { infringementActionRoute } from './infringement-action.route';

@NgModule({
  imports: [InfringementwebSharedModule, RouterModule.forChild(infringementActionRoute)],
  declarations: [
    InfringementActionComponent,
    InfringementActionDetailComponent,
    InfringementActionUpdateComponent,
    InfringementActionDeleteDialogComponent,
  ],
  entryComponents: [InfringementActionDeleteDialogComponent],
})
export class InfringementwebInfringementActionModule {}
