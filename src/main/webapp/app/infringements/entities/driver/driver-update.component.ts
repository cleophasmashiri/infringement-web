import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDriver, Driver } from 'app/shared/model/driver.model';
import { DriverService } from './driver.service';
import { RegisterService } from 'app/account/register/register.service';
import { AccountService } from 'app/core/auth/account.service';

@Component({
  selector: 'jhi-driver-update',
  templateUrl: './driver-update.component.html',
})
export class DriverUpdateComponent implements OnInit {
  isSaving = false;
  success = false;
  @Input()
  driverEmail = '';

  @Output()
  driverCreated: EventEmitter<any> = new EventEmitter();

  @Output()
  goBackToList = new EventEmitter();

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

  @Input()
  get driver(): IDriver {
    return this.createFromForm();
  }
  set driver(driver: IDriver) {
    this.updateForm(driver);
  }

  constructor(
    private accountService: AccountService,
    private registerService: RegisterService,
    protected driverService: DriverService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  updateDriver(driver: IDriver): void {
    if (driver) {
      this.updateForm(driver);
    }
  }

  previousState(): void {
    this.goBackToList.emit();
  }

  ngOnInit(): void {
    if (this.accountService.isDriverPath) {
      this.accountService.identity().subscribe(acc => {
        if (acc && acc.email) {
          this.driverService.findByEmail(acc?.email).subscribe(
            (res: any) => {
              if (res && res.body) {
                this.updateDriver(res.body);
              }
            },
            error => {
              if (error && error.status && error.status === 404) {
                this.driverEmail = acc.email;
                this.driver = new Driver();
                this.driver.email = acc.email;
                this.updateForm(this.driver);
              }
            }
          );
        }
      });
    } else {
      if (this.driver) {
        this.updateForm(this.driver);
      } else {
        this.activatedRoute.data.subscribe(({ driver }) => {
          this.updateForm(driver);
        });
      }
    }

    this.activatedRoute.queryParams.subscribe(param => {
      if (param && param['driveremail']) {
        this.driverEmail = param['driveremail'];
        // eslint-disable-next-line no-console
        console.log('driverEmail', this.driverEmail);
      }
    });
  }

  updateForm(driver: IDriver): void {
    if (driver) {
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
  }

  save(): void {
    this.isSaving = true;
    const driver = this.createFromForm();

    if (driver.id !== undefined && driver.id !== null) {
      this.subscribeToSaveResponse(this.driverService.update({ ...driver }), false);
    } else {
      this.subscribeToSaveResponse(this.driverService.create(driver), true);
    }
  }

  private createFromForm(): IDriver {
    return {
      ...new Driver(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      middleName: this.editForm.get(['middleName'])!.value,
      email: this.driverEmail,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDriver>>, isNew: boolean): void {
    result.subscribe(
      () => this.onSaveSuccess(isNew),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(isNew: boolean): void {
    this.registerService.newDriverRegistered.next();
    this.isSaving = false;
    this.driverCreated.emit('');
    this.previousState();
    this.success = true;
  }

  protected onSaveError(): void {
    this.isSaving = false;
    this.success = false;
  }
}
