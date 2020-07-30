import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInfringementAction, InfringementAction } from 'app/shared/model/infringement-action.model';
import { InfringementActionService } from './infringement-action.service';
import { InfringementActionComponent } from './infringement-action.component';
import { InfringementActionDetailComponent } from './infringement-action-detail.component';
import { InfringementActionUpdateComponent } from './infringement-action-update.component';

@Injectable({ providedIn: 'root' })
export class InfringementActionResolve implements Resolve<IInfringementAction> {
  constructor(private service: InfringementActionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInfringementAction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((infringementAction: HttpResponse<InfringementAction>) => {
          if (infringementAction.body) {
            return of(infringementAction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InfringementAction());
  }
}

export const infringementActionRoute: Routes = [
  {
    path: '',
    component: InfringementActionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'infringementwebApp.infringementAction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InfringementActionDetailComponent,
    resolve: {
      infringementAction: InfringementActionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'infringementwebApp.infringementAction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InfringementActionUpdateComponent,
    resolve: {
      infringementAction: InfringementActionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'infringementwebApp.infringementAction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InfringementActionUpdateComponent,
    resolve: {
      infringementAction: InfringementActionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'infringementwebApp.infringementAction.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
