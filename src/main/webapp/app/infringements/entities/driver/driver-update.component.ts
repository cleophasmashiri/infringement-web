import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDriver, Driver } from 'app/shared/model/driver.model';
import { DriverService } from './driver.service';

@Component({
  selector: 'jhi-driver-update',
  templateUrl: './driver-update.component.html',
})
export class DriverUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    firstName: [],
    lastName: [],
    middleName: [],
    email: [],
    nationalIdNumber: [],
    cellNumber: [],
    province: [],
    city: [],
    suburb: [],
    streetName: [],
    streetPropertyNumber: [],
    unitNumber: [],
  });

  constructor(protected driverService: DriverService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ driver }) => {
      this.updateForm(driver);
    });
  }

  updateForm(driver: IDriver): void {
    this.editForm.patchValue({
      id: driver.id,
      firstName: driver.firstName,
      lastName: driver.lastName,
      middleName: driver.middleName,
      email: driver.email,
      nationalIdNumber: driver.nationalIdNumber,
      cellNumber: driver.cellNumber,
      province: driver.province,
      city: driver.city,
      suburb: driver.suburb,
      streetName: driver.streetName,
      streetPropertyNumber: driver.streetPropertyNumber,
      unitNumber: driver.unitNumber,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const driver = this.createFromForm();
    if (driver.id !== undefined) {
      this.subscribeToSaveResponse(this.driverService.update(driver));
    } else {
      this.subscribeToSaveResponse(this.driverService.create(driver));
    }
  }

  private createFromForm(): IDriver {
    return {
      ...new Driver(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      middleName: this.editForm.get(['middleName'])!.value,
      email: this.editForm.get(['email'])!.value,
      nationalIdNumber: this.editForm.get(['nationalIdNumber'])!.value,
      cellNumber: this.editForm.get(['cellNumber'])!.value,
      province: this.editForm.get(['province'])!.value,
      city: this.editForm.get(['city'])!.value,
      suburb: this.editForm.get(['suburb'])!.value,
      streetName: this.editForm.get(['streetName'])!.value,
      streetPropertyNumber: this.editForm.get(['streetPropertyNumber'])!.value,
      unitNumber: this.editForm.get(['unitNumber'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDriver>>): void {
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
}
