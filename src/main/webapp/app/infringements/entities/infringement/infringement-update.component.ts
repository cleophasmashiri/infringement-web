import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IInfringement, Infringement } from 'app/shared/model/infringement.model';
import { InfringementService } from './infringement.service';
import { IDriver } from 'app/shared/model/driver.model';
import { IVehicle } from 'app/shared/model/vehicle.model';
import { DriverService } from '../driver/driver.service';
import { VehicleService } from '../vehicle/vehicle.service';
type SelectableEntity = IDriver | IVehicle;

@Component({
  selector: 'jhi-infringement-update',
  templateUrl: './infringement-update.component.html',
})
export class InfringementUpdateComponent implements OnInit {
  isSaving = false;
  drivers: IDriver[] = [];
  vehicles: IVehicle[] = [];

  editForm = this.fb.group({
    id: [],
    processInstanceId: [],
    infringementType: [],
    dateDone: [],
    doneBy: [],
    driver: [],
    vehicle: [],
  });

  constructor(
    protected infringementService: InfringementService,
    protected driverService: DriverService,
    protected vehicleService: VehicleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ infringement }) => {
      if (!infringement.id) {
        const today = moment().startOf('day');
        infringement.dateDone = today;
      }

      this.updateForm(infringement);

      this.driverService.query().subscribe((res: HttpResponse<IDriver[]>) => (this.drivers = res.body || []));

      this.vehicleService.query().subscribe((res: HttpResponse<IVehicle[]>) => (this.vehicles = res.body || []));
    });
  }

  updateForm(infringement: IInfringement): void {
    this.editForm.patchValue({
      id: infringement.id,
      processInstanceId: infringement.processInstanceId,
      infringementType: infringement.infringementType,
      dateDone: infringement.dateDone ? infringement.dateDone.format(DATE_TIME_FORMAT) : null,
      doneBy: infringement.doneBy,
      driver: infringement.driver,
      vehicle: infringement.vehicle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const infringement = this.createFromForm();
    if (infringement.id !== undefined) {
      this.subscribeToSaveResponse(this.infringementService.update(infringement));
    } else {
      this.subscribeToSaveResponse(this.infringementService.create(infringement));
    }
  }

  private createFromForm(): IInfringement {
    return {
      ...new Infringement(),
      id: this.editForm.get(['id'])!.value,
      processInstanceId: this.editForm.get(['processInstanceId'])!.value,
      infringementType: this.editForm.get(['infringementType'])!.value,
      dateDone: this.editForm.get(['dateDone'])!.value ? moment(this.editForm.get(['dateDone'])!.value, DATE_TIME_FORMAT) : undefined,
      doneBy: this.editForm.get(['doneBy'])!.value,
      driver: this.editForm.get(['driver'])!.value,
      vehicle: this.editForm.get(['vehicle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInfringement>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
