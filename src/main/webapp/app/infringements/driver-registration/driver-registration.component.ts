import { Component, AfterViewInit, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RegisterService } from 'app/account/register/register.service';
import { DriverUpdateComponent } from '../entities/driver/driver-update.component';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-driver-registration',
  templateUrl: './driver-registration.component.html',
})
export class DriverRegistrationComponent implements OnDestroy, OnInit {
  driverEmail?: string;
  newUserRegisteredSubscription: Subscription;
  newDriverRegisteredSubscription: Subscription;

  background: any = undefined;
  links = [
    { name: 'Register User', url: '/driver-registration/user' },
    { name: 'Driver Information', url: '/driver-registration/info' },
  ];
  activeLink = this.links[0];

  constructor(private registerService: RegisterService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.newUserRegisteredSubscription = this.registerService.newUserRegistered.subscribe(driveremail => {
      this.driverEmail = driveremail;
      this.router.navigate(['/driver-registration/info'], { queryParams: { driveremail } });
    });
    this.newDriverRegisteredSubscription = this.registerService.newDriverRegistered.subscribe(() => {
      const redirecturl = 'drivers';
      this.router.navigate(['/account/login'], { queryParams: { redirecturl } });
    });
  }

  ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log(' this.activatedRoute.fragment', this.activatedRoute.fragment);
    this.activatedRoute.queryParams.subscribe(parms => (this.driverEmail = parms['driveremail']));
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
