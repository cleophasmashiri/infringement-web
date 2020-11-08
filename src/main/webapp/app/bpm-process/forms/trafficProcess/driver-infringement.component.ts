import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamundaRestService } from '../../camunda-rest.service';
import { CompleteTaskComponent } from '../general/complete-task.component';
import { InfringementSchema } from 'app/bpm-process/schemas/infringement.schema';
import { InfringementTypeSchema } from 'app/bpm-process/schemas/infringement-type.schema';

@Component({
  selector: 'jhi-driver-infringement',
  templateUrl: './driver-infringement.component.html',
  styleUrls: [],
})
export class DriverInfringementComponent extends CompleteTaskComponent {
  submitted = false;
  model = new InfringementSchema('', InfringementTypeSchema.Other, '', '', '', '', '', '');
  driverChoices = [
    { name: 'Submit Proof Of Payment', value: 'Pay' },
    { name: 'Nominate Another Driver', value: 'Nominate Another Driver' },
    { name: 'Make Representation', value: 'Make Representation' },
    { name: 'Go To Court', value: 'Go To Court' },
  ]; //Create/View Demerit Points

  constructor(route: ActivatedRoute, router: Router, camundaRestService: CamundaRestService) {
    super(route, router, camundaRestService);
    this.route.params.subscribe(params => {
      const taskId = params.id;
      const variableNames = Object.keys(this.model).join(',');
      this.loadExistingVariables(taskId, variableNames);
    });
  }

  showTasks(): void {
    this.submitted = false;
  }
}
