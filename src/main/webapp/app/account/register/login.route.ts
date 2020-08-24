import { Route } from '@angular/router';
import { LoginModalComponent } from 'app/shared/login/login.component';

export const loginRoute: Route = {
  path: 'login',
  component: LoginModalComponent,
  data: {
    authorities: [],
    pageTitle: 'login.title',
  },
};
