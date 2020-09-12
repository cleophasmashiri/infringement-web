import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../schemas/task.model';
import { CamundaRestService } from '../camunda-rest.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { Observable } from 'rxjs';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
})
export class TasklistComponent implements OnInit {
  tasks: Task[] = [];
  taskId?: string;
  formKey?: string;
  isShowTaskView = false;
  account$?: Observable<Account | null>;
  displayedColumns: string[] = ['name', 'assignee', 'created'];

  constructor(private accountService: AccountService, private camundaRestService: CamundaRestService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.account$ = this.accountService.identity();
    this.account$.subscribe(acc => {
      this.route.params.subscribe(params => {
        if (params.id != null) {
          this.taskId = params.id;
          this.getFormKey();
        } else {
          if (this.accountService.isDriverPath) {
            this.getTasksByUser(acc?.email);
          } else {
            this.getTasks();
          }
        }
      });
    });
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
  getTasksByUser(assignee?: string): void {
    if (assignee) {
      this.camundaRestService.getTasksByAssignee(assignee).subscribe(tasks => {
        this.tasks = tasks;
      });
    }
  }
}
