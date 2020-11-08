import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInfringementAction } from 'app/shared/model/infringement-action.model';
import { InfringementActionService } from './infringement-action.service';
import { InfringementActionDeleteDialogComponent } from './infringement-action-delete-dialog.component';
import { AccountService } from 'app/core/auth/account.service';
import { DriverService } from '../driver/driver.service';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'app/core/user/account.model';
import { InfringementActionType } from 'app/shared/model/enumerations/infringement-action-type.model';

@Component({
  selector: 'jhi-infringement-action',
  templateUrl: './infringement-action.component.html',
})
export class InfringementActionComponent implements OnInit, OnDestroy {
  infringementActions?: IInfringementAction[];
  eventSubscriber?: Subscription;
  displayedColumns: any[] = ['infringementActionType', 'notes', 'dateDone', 'points', 'amount'];
  account$?: Observable<Account | null>;
  actionType: InfringementActionType | undefined;
  @Input()
  infringementId?: string;

  constructor(
    protected accountService: AccountService,
    protected driverService: DriverService,
    protected activatedRoute: ActivatedRoute,
    protected infringementActionService: InfringementActionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(email: string): void {
    this.driverService.findByEmail(email).subscribe(driver => {
      if (driver && driver.body) {
        const driverId = driver.body?.id;
        this.infringementActionService
          .queryByDriverIdAndInfringementActionType({ driverId, infringementActionType: this.actionType })
          .subscribe((infringementActions: HttpResponse<IInfringementAction[]>) => {
            this.infringementActions = infringementActions.body || [];
          });
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ actionType }) => (this.actionType = actionType));
    this.account$ = this.accountService.identity();
    this.account$.subscribe(acc => {
      const email = acc?.email ? acc?.email : '';
      this.loadAll(email);
    });
    this.registerChangeInInfringementActions();
  }

  showItemView(): void {}

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
    //this.eventSubscriber = this.eventManager.subscribe('infringementActionListModification', () => this.loadAll());
  }

  delete(infringementAction: IInfringementAction): void {
    const modalRef = this.modalService.open(InfringementActionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.infringementAction = infringementAction;
  }
}
