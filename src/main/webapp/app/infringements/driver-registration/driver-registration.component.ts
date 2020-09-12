import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RegisterService } from 'app/account/register/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Driver, IDriver } from 'app/shared/model/driver.model';
import { DriverService } from '../entities/driver/driver.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-driver-registration',
  templateUrl: './driver-registration.component.html',
})
export class DriverRegistrationComponent implements OnDestroy, OnInit {
  driverEmail?: string;
  newUserRegisteredSubscription: Subscription;
  newDriverRegisteredSubscription: Subscription;

  background: any = undefined;
  links = [{ name: 'Register User', url: '/driver-registration/user' }];
  activeLink = this.links[0];

  constructor(
    private driverService: DriverService,
    private registerService: RegisterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.newUserRegisteredSubscription = this.registerService.newUserRegistered.subscribe(driveremail => {
      this.driverEmail = driveremail;
      this.createDriver(driveremail);
    });
    this.newDriverRegisteredSubscription = this.registerService.newDriverRegistered.subscribe(() => {
      const redirecturl = 'drivers';
      this.router.navigate(['/account/login'], { queryParams: { redirecturl } });
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(parms => (this.driverEmail = parms['driveremail']));
  }

  createDriver(email: string): void {
    const driver = new Driver();
    driver.email = email;
    this.subscribeToSaveResponse(this.driverService.create(driver), true);
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDriver>>, isNew: boolean): void {
    result.subscribe(() => this.onSaveSuccess(isNew));
  }

  protected onSaveSuccess(isNew: boolean): void {
    this.registerService.newDriverRegistered.next();
  }

  ngOnDestroy(): void {
    if (this.newUserRegisteredSubscription) {
      this.newUserRegisteredSubscription.unsubscribe();
    }
    if (this.newDriverRegisteredSubscription) {
      this.newDriverRegisteredSubscription.unsubscribe();
    }
  }
}
