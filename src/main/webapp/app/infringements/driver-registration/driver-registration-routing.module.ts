import { Routes } from '@angular/router';
import { RegisterComponent } from 'app/account/register/register.component';
import { DriverRegistrationComponent } from './driver-registration.component';
import { DriverUpdateComponent } from '../entities/driver/driver-update.component';

export const driverRegistrationRoutes: Routes = [
  {
    path: '',
    component: DriverRegistrationComponent,
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
      },
      { path: 'user', component: RegisterComponent },
      { path: 'info', component: DriverUpdateComponent },
    ],
  },
];
