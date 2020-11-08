import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamundaRestService } from '../../camunda-rest.service';
import { CompleteTaskComponent } from '../general/complete-task.component';
import { InfringementSchema } from 'app/bpm-process/schemas/infringement.schema';
import { InfringementTypeSchema } from 'app/bpm-process/schemas/infringement-type.schema';

@Component({
  selector: 'jhi-traffic-admin-infringement',
  templateUrl: './traffic-admin-infringement.component.html',
  styleUrls: [],
})
export class TrafficAdminInfringementComponent extends CompleteTaskComponent {
  submitted = false;
  model = new InfringementSchema('', InfringementTypeSchema.Other, '', '', '', '', '', '');
  adminChoices = [
    { name: 'Cancel Infringement', value: 'Cancel' },
    { name: 'Go To Court', value: 'Go To Court' },
    { name: 'Create Courtesy Letter', value: 'Create Courtesy Letter' },
    { name: 'Create Enforcement Order', value: 'Create Enforcement Order' },
    { name: 'Create Warrant of Execution', value: 'Create Warrant of Execution' },
    { name: 'Nominate Another Driver', value: 'Nominate Another Driver' },
    { name: 'Add Demerit Points', value: 'Add Demerit Points ' },
  ];

  constructor(route: ActivatedRoute, router: Router, camundaRestService: CamundaRestService) {
    super(route, router, camundaRestService);
    this.route.params.subscribe(params => {
      const taskId = params.id;
      const variableNames = Object.keys(this.model).join(',');
      this.loadExistingVariables(taskId, variableNames);
    });
  }
}
