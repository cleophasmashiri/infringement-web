import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'jhi-driver-tasks',
  templateUrl: './driver-tasks.component.html',
  styleUrls: ['./driver-tasks.component.scss'],
})
export class DriverTasksComponent implements OnInit {
  //tasks?: Task[];
  taskId?: string;
  formKey?: string;
  groups$?: Observable<string[]>;
  displayedColumns: string[] = ['name', 'assignee', 'created'];

  // constructor(driver-tasks.component.ts
  //   private camundaRestService: CamundaRestService,
  //   private route: ActivatedRoute) {
  // }

  // ngOnInit() {
  //   if (this.route.params != null) {
  //     this.route.params.subscribe(params => {
  //       if (params.id != null) {
  //         this.taskId = params.id;
  //         this.getFormKey();
  //       } else {
  //         this.getTasks();
  //       }
  //     });
  //   }
  // }

  // getFormKey(): void {
  //   this.camundaRestService
  //     .getTaskFormKey(this.taskId)
  //     .subscribe((formKey: any) => this.formKey = formKey.key);
  // }

  getTasks(): void {
    // let username = this.authService.getCurrentUserName();
    // if (username) {
    //   this.camundaRestService
    //   .getTasksByAssignee(username)
    //   .subscribe((tasks: any) => {
    //     this.tasks = tasks;
    //   });
    // } else {
    //   this.tasks = undefined;
    // }
  }

  ngOnInit(): void {}
}
