import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { iif, Observable } from 'rxjs';
import { IVehicle, Vehicle } from 'app/shared/model/vehicle.model';
import { VehicleService } from './vehicle.service';
import { IDriver } from 'app/shared/model/driver.model';
import { DriverService } from '../driver/driver.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-vehicle-update',
  templateUrl: './vehicle-update.component.html',
})
export class VehicleUpdateComponent implements OnInit {
  isSaving = false;
  drivers: IDriver[] = [];

  @Output()
  vehicleCreated: EventEmitter<any> = new EventEmitter();

  @Output()
  goBackToList = new EventEmitter();

  @Input()
  get vehicle(): IVehicle {
    return this.createFromForm();
  }
  set vehicle(vehicle: IVehicle) {
    this.updateForm(vehicle);
  }

  editForm = this.fb.group({
    id: [],
    plateNumber: [],
    make: [],
    model: [],
    engineNumber: [],
    chassisNumber: [],
    color: [],
    yearFirstRegistered: [],
    driver: [Validators.required],
  });

  constructor(
    protected accountService: AccountService,
    protected vehicleService: VehicleService,
    protected driverService: DriverService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.accountService.isAdminsPath) {
      this.driverService.query().subscribe((res: HttpResponse<IDriver[]>) => (this.drivers = res.body || []));
    } else {
      this.activatedRoute.data.subscribe(({ vehicle }) => {
        this.updateForm(vehicle);
        this.driverService.query().subscribe((res: HttpResponse<IDriver[]>) => (this.drivers = res.body || []));
      });
    }
  }

  updateVehicle(vehicle: IVehicle): void {
    if (vehicle) {
      this.updateForm(vehicle);
    }
  }

  previousState(): void {
    this.goBackToList.emit();
  }

  updateForm(vehicle: IVehicle): void {
    if (vehicle) {
      this.editForm.patchValue({
        id: vehicle.id,
        plateNumber: vehicle.plateNumber,
        make: vehicle.make,
        model: vehicle.model,
        engineNumber: vehicle.engineNumber,
        chassisNumber: vehicle.chassisNumber,
        color: vehicle.color,
        yearFirstRegistered: vehicle.yearFirstRegistered,
        driver: vehicle.driver,
      });
    }
  }

  save(): void {
    this.isSaving = true;
    const vehicle = this.createFromForm();
    if (vehicle.id === undefined || vehicle.id === null) {
      this.subscribeToSaveResponse(this.vehicleService.create(vehicle));
    } else {
      this.subscribeToSaveResponse(this.vehicleService.update(vehicle));
    }
  }

  private createFromForm(): IVehicle {
    return {
      ...new Vehicle(),
      id: this.editForm.get(['id'])!.value,
      plateNumber: this.editForm.get(['plateNumber'])!.value,
      make: this.editForm.get(['make'])!.value,
      model: this.editForm.get(['model'])!.value,
      engineNumber: this.editForm.get(['engineNumber'])!.value,
      chassisNumber: this.editForm.get(['chassisNumber'])!.value,
      color: this.editForm.get(['color'])!.value,
      yearFirstRegistered: this.editForm.get(['yearFirstRegistered'])!.value,
      driver: this.editForm.get(['driver'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVehicle>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDriver): any {
    return item.id;
  }
}
