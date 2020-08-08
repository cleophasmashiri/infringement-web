import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskViewComponent } from './task-view/task-view.component';
import { CreateProcessComponent } from './create-process/create-process.component';
import { StartProcessComponent } from './start-process/start-process.component';
import { NewProcessComponent } from './new-process/new-process.component';
import { ProcesslistComponent } from './processlist/processlist.component';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { JhMaterialModule } from 'app/jh-material.module';

@NgModule({
  declarations: [
    TaskViewComponent,
    CreateProcessComponent,
    StartProcessComponent,
    NewProcessComponent,
    ProcesslistComponent,
    GenericFormComponent,
    TasklistComponent,
  ],
  imports: [CommonModule, JhMaterialModule],
})
export class BpmProcessModule {}
