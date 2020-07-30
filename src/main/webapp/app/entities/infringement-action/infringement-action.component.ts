import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInfringementAction } from 'app/shared/model/infringement-action.model';
import { InfringementActionService } from './infringement-action.service';
import { InfringementActionDeleteDialogComponent } from './infringement-action-delete-dialog.component';

@Component({
  selector: 'jhi-infringement-action',
  templateUrl: './infringement-action.component.html',
})
export class InfringementActionComponent implements OnInit, OnDestroy {
  infringementActions?: IInfringementAction[];
  eventSubscriber?: Subscription;

  constructor(
    protected infringementActionService: InfringementActionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.infringementActionService
      .query()
      .subscribe((res: HttpResponse<IInfringementAction[]>) => (this.infringementActions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInfringementActions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInfringementAction): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInfringementActions(): void {
    this.eventSubscriber = this.eventManager.subscribe('infringementActionListModification', () => this.loadAll());
  }

  delete(infringementAction: IInfringementAction): void {
    const modalRef = this.modalService.open(InfringementActionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.infringementAction = infringementAction;
  }
}
