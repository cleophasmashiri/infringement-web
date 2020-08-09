import { Route, Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './task-view/task-view.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { StartProcessComponent } from './start-process/start-process.component';
import { NgModule } from '@angular/core';

const bpmProcessRoutes: Routes = [
  { path: 'process/tasks', component: TasklistComponent },
  { path: 'process/tasks/:id', component: TaskViewComponent },
  { path: 'process/startprocess/:processdefinitionkey', component: StartProcessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(bpmProcessRoutes)],
  exports: [RouterModule],
})
export class BpmProcessRoutingModule {}
