import { Route } from '@angular/router';

import { HomeStaffComponent } from './home-staff.component';

export const HOME_STAFF_ROUTE: Route = {
  path: 'staff',
  component: HomeStaffComponent,
  data: {
    authorities: [],
    pageTitle: 'home.title',
  },
};
