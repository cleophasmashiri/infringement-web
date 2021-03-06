import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInfringement } from 'app/shared/model/infringement.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { InfringementService } from './infringement.service';
import { InfringementDeleteDialogComponent } from './infringement-delete-dialog.component';
import { Observable } from 'rxjs/internal/Observable';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-infringement',
  templateUrl: './infringement.component.html',
})
export class InfringementComponent implements OnInit, OnDestroy {
  infringements: IInfringement[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  displayedColumns: string[] = ['id', 'processInstanceId', 'infringementType', 'dateDone', 'doneBy', 'driver', 'vehicle', 'actions'];
  isShowViewMode = false;
  infringement: IInfringement | null = null;
  account$?: Observable<Account | null>;

  constructor(
    private accountService: AccountService,
    protected infringementService: InfringementService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.infringements = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadByDriverEmail(email: string): void {
    this.infringementService
      .queryByDriverEmail(email, {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IInfringement[]>) => this.paginateInfringements(res.body, res.headers));
  }

  loadAll(): void {
    this.infringementService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IInfringement[]>) => this.paginateInfringements(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.infringements = [];
    if (this.accountService.isDriverPath) {
      this.loadByDriverEmail('');
    } else {
      this.loadAll();
    }
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    if (this.accountService.isDriverPath) {
      this.account$ = this.accountService.identity();
      this.account$.subscribe(acc => {
        if (acc && acc.email) {
          this.loadByDriverEmail(acc.email);
        }
      });
    } else {
      this.loadAll();
    }

    this.registerChangeInInfringements();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInfringement): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInfringements(): void {
    this.eventSubscriber = this.eventManager.subscribe('infringementListModification', () => this.reset());
  }

  delete(infringement: IInfringement): void {
    const modalRef = this.modalService.open(InfringementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.infringement = infringement;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateInfringements(data: IInfringement[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.infringements.push(data[i]);
      }
    }
  }

  showViewMode(infringement: IInfringement): void {
    this.infringement = infringement;
    this.isShowViewMode = true;
  }

  goBackToListHandler(): void {
    this.isShowViewMode = false;
  }
}
