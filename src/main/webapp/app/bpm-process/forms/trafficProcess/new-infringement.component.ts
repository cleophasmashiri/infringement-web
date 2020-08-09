import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamundaRestService } from '../../camunda-rest.service';
import { StartProcessInstanceComponent } from '../general/start-process-instance.component';
import { InfringementSchema } from 'app/bpm-process/schemas/infringement.schema';
import { InfringementTypeSchema } from 'app/bpm-process/schemas/infringement-type.schema';

@Component({
  selector: 'jhi-new-infringement',
  templateUrl: './new-infringement.component.html',
  styleUrls: ['./new-infringement.component.scss'],
})
export class NewInfringementComponent extends StartProcessInstanceComponent {
  submitted = false;
  model = new InfringementSchema('', InfringementTypeSchema.Other, '', '', '', '', '', '', '');
  private fileToUpload?: File;
  private SUCCESS = false;
  infringmentTypes = [
    { value: 'Other', name: 'Other' },
    { value: 'OverSpeeding', name: 'Over-Speeding' },
    { value: 'ParkingInfringement', name: 'Parking Infringement' },
  ];
  links = [
    { name: 'Create another infringement', url: '/process/startprocess/trafficProcess' },
    { name: 'View Tasks', url: '/process/tasklist' },
  ];
  route: ActivatedRoute;
  camundaRestService: CamundaRestService;

  constructor(route: ActivatedRoute, camundaRestService: CamundaRestService) {
    super(route, camundaRestService);
    this.route = route;
    this.camundaRestService = camundaRestService;
  }

  onFileComplete(data: any): void {}

  onSubmit(): void {
    this.route.params.subscribe(params => {
      const processDefinitionKey = params.processdefinitionkey;
      const variables = this.generateVariablesFromFormFields();
      this.camundaRestService.postProcessInstance(processDefinitionKey, variables).subscribe();
      this.submitted = true;
    });
  }

  generateVariablesFromFormFields(): any {
    const variables = {
      variables: {},
    };
    Object.keys(this.model).forEach(field => {
      variables.variables[field] = {
        value: this.model[field],
      };
    });

    return variables;
  }
  showTasks(): void {
    this.submitted = false;
  }
  toBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  handleFileInput(files: any): void {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
  }
  // TODO must resolve file upload
  uploadFileToActivity(): void {
    // this.toBase64(this.fileToUpload)
    // .then((res: string) => this.model.image1 = res);
  }
}
