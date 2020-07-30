import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDriver } from 'app/shared/model/driver.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DriverService } from './driver.service';
import { DriverDeleteDialogComponent } from './driver-delete-dialog.component';

@Component({
  selector: 'jhi-driver',
  templateUrl: './driver.component.html',
})
export class DriverComponent implements OnInit, OnDestroy {
  drivers: IDriver[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected driverService: DriverService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.drivers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.driverService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IDriver[]>) => this.paginateDrivers(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.drivers = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDrivers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDriver): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDrivers(): void {
    this.eventSubscriber = this.eventManager.subscribe('driverListModification', () => this.reset());
  }

  delete(driver: IDriver): void {
    const modalRef = this.modalService.open(DriverDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.driver = driver;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateDrivers(data: IDriver[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.drivers.push(data[i]);
      }
    }
  }
}
