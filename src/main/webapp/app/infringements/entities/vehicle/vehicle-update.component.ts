import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IVehicle, Vehicle } from 'app/shared/model/vehicle.model';
import { VehicleService } from './vehicle.service';
import { IDriver } from 'app/shared/model/driver.model';
import { DriverService } from '../driver/driver.service';

@Component({
  selector: 'jhi-vehicle-update',
  templateUrl: './vehicle-update.component.html',
})
export class VehicleUpdateComponent implements OnInit {
  isSaving = false;
  drivers: IDriver[] = [];

  editForm = this.fb.group({
    id: [],
    plateNumber: [],
    make: [],
    model: [],
    engineNumber: [],
    chassisNumber: [],
    color: [],
    yearFirstRegistered: [],
    driver: [],
  });

  constructor(
    protected vehicleService: VehicleService,
    protected driverService: DriverService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vehicle }) => {
      this.updateForm(vehicle);

      this.driverService.query().subscribe((res: HttpResponse<IDriver[]>) => (this.drivers = res.body || []));
    });
  }

  updateForm(vehicle: IVehicle): void {
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const vehicle = this.createFromForm();
    if (vehicle.id !== undefined) {
      this.subscribeToSaveResponse(this.vehicleService.update(vehicle));
    } else {
      this.subscribeToSaveResponse(this.vehicleService.create(vehicle));
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
