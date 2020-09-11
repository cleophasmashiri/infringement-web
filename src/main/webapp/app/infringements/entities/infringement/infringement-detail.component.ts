import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IInfringement } from 'app/shared/model/infringement.model';

@Component({
  selector: 'jhi-infringement-detail',
  templateUrl: './infringement-detail.component.html',
})
export class InfringementDetailComponent {
  @Input()
  infringement: IInfringement | null = null;

  @Output()
  goBackToList = new EventEmitter();

  constructor() {}

  previousState(): void {
    this.goBackToList.emit();
  }
}
