import { Route } from '@angular/router';
import { LoginModalComponent } from 'app/shared/login/login.component';

export const loginStaffRoute: Route = {
  path: 'staff/login',
  component: LoginModalComponent,
  data: {
    authorities: [],
    pageTitle: 'login.title',
  },
};
