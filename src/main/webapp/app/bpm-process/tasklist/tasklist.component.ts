import { Component, OnInit } from '@angular/core';
import { Task } from '../schemas/task.model';
import { CamundaRestService } from '../camunda-rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
})
export class TasklistComponent implements OnInit {
  tasks: Task[] = [{ id: '100', name: 'Task 1', key: 'key1' }];
  taskId?: string;
  formKey?: string;
  isShowTaskView = false;

  displayedColumns: string[] = ['name', 'assignee', 'created'];

  constructor(private camundaRestService: CamundaRestService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.params != null) {
      this.route.params.subscribe(params => {
        if (params.id != null) {
          this.taskId = params.id;
          this.getFormKey();
        } else {
          this.getTasks();
        }
      });
    }
  }

  showTaskView(): void {
    this.isShowTaskView = !this.isShowTaskView;
  }

  getFormKey(): void {
    this.camundaRestService.getTaskFormKey(this.taskId).subscribe(formKey => (this.formKey = formKey.key));
  }

  getTasks(): void {
    this.camundaRestService.getTasksByGroup('trafficAdmin').subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}
