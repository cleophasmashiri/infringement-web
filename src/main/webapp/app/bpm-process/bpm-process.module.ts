import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskViewComponent } from './task-view/task-view.component';
import { CreateProcessComponent } from './create-process/create-process.component';
import { StartProcessComponent } from './start-process/start-process.component';
import { ProcesslistComponent } from './processlist/processlist.component';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { InfringementwebSharedModule } from 'app/shared/shared.module';
import { BpmProcessRoutingModule } from './bpm-process-routing.module';

@NgModule({
  declarations: [
    TaskViewComponent,
    CreateProcessComponent,
    StartProcessComponent,
    ProcesslistComponent,
    GenericFormComponent,
    TasklistComponent,
  ],
  imports: [CommonModule, InfringementwebSharedModule, BpmProcessRoutingModule],
})
export class BpmProcessModule {}
