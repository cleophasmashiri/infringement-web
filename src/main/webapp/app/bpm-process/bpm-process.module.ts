import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { CreateProcessComponent } from './create-process/create-process.component';
import { StartProcessComponent } from './start-process/start-process.component';

@NgModule({
  declarations: [TaskListComponent, TaskViewComponent, CreateProcessComponent, StartProcessComponent],
  imports: [CommonModule],
})
export class BpmProcessModule {}
