import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInfringementAction } from 'app/shared/model/infringement-action.model';
import { InfringementActionService } from './infringement-action.service';

@Component({
  templateUrl: './infringement-action-delete-dialog.component.html',
})
export class InfringementActionDeleteDialogComponent {
  infringementAction?: IInfringementAction;

  constructor(
    protected infringementActionService: InfringementActionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.infringementActionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('infringementActionListModification');
      this.activeModal.close();
    });
  }
}
