import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamundaRestService } from '../camunda-rest.service';

@Component({
  selector: 'jhi-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.scss'],
})
export class StartProcessComponent implements OnInit {
  processDefinitionKey?: string;
  formKey?: string;
  rootViewContainer = null;

  constructor(private route: ActivatedRoute, private router: Router, private camundaRestService: CamundaRestService) {}

  ngOnInit(): void {
    if (this.route.params != null) {
      this.route.params.subscribe(params => {
        this.processDefinitionKey = params.processdefinitionkey;
        this.loadTaskKey();
      });
    }
  }

  loadTaskKey(): void {
    this.camundaRestService.getProcessDefinitionTaskKey(this.processDefinitionKey).subscribe(formKey => {
      this.formKey = formKey.key;
    });
  }
}
