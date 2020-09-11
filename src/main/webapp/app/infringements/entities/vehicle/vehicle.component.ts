import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVehicle } from 'app/shared/model/vehicle.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { VehicleService } from './vehicle.service';
import { VehicleDeleteDialogComponent } from './vehicle-delete-dialog.component';
import { VehicleUpdateComponent } from './vehicle-update.component';

@Component({
  selector: 'jhi-vehicle',
  templateUrl: './vehicle.component.html',
})
export class VehicleComponent implements OnInit, OnDestroy {
  vehicles: IVehicle[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;
  isShowViewMode = false;
  isShowEditMode = false;
  vehicle: any;
  displayedColumns: string[] = [
    'id',
    'plateNumber',
    'make',
    'model',
    'engineNumber',
    'chassisNumber',
    'yearFirstRegistered',
    'viewActions',
    'editActions',
    'deleteActions',
  ];

  @ViewChild(VehicleUpdateComponent)
  vehicleUpdateComponent!: VehicleUpdateComponent;

  constructor(
    protected vehicleService: VehicleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.vehicles = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  goBackToListHandler(): void {
    this.isShowEditMode = false;
    this.isShowViewMode = false;
  }
  create(): void {
    this.isShowEditMode = true;
    this.isShowViewMode = false;
  }
  editViewMode(vehicle: IVehicle): void {
    this.isShowEditMode = true;
    this.isShowViewMode = false;
    this.vehicle = vehicle;
    this.vehicleUpdateComponent.updateVehicle(vehicle);
  }
  showViewMode(vehicle: IVehicle): void {
    this.isShowEditMode = false;
    this.isShowViewMode = true;
    this.vehicle = vehicle;
  }

  loadAll(): void {
    this.vehicleService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IVehicle[]>) => this.paginateVehicles(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.vehicles = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVehicles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVehicle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVehicles(): void {
    this.eventSubscriber = this.eventManager.subscribe('vehicleListModification', () => this.reset());
  }

  delete(vehicle: IVehicle): void {
    const modalRef = this.modalService.open(VehicleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vehicle = vehicle;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateVehicles(data: IVehicle[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.vehicles.push(data[i]);
      }
    }
  }
}
