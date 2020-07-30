import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInfringement } from 'app/shared/model/infringement.model';
import { InfringementService } from './infringement.service';

@Component({
  templateUrl: './infringement-delete-dialog.component.html',
})
export class InfringementDeleteDialogComponent {
  infringement?: IInfringement;

  constructor(
    protected infringementService: InfringementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.infringementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('infringementListModification');
      this.activeModal.close();
    });
  }
}
