import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfringementwebSharedModule } from 'app/shared/shared.module';
import { ProcessCountsComponent } from './process-counts/process-counts.component';

@NgModule({
  imports: [InfringementwebSharedModule],
  declarations: [ProcessCountsComponent],
  exports: [ProcessCountsComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InfringementwebDashboardModule {}
