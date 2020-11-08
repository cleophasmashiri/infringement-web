import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Observable } from 'rxjs';
import { Account } from 'app/core/user/account.model';
import { DriverService } from 'app/infringements/entities/driver/driver.service';
import { ActivatedRoute } from '@angular/router';
import { InfringementActionType } from 'app/shared/model/enumerations/infringement-action-type.model';
import { InfringementActionService } from 'app/infringements/entities/infringement-action/infringement-action.service';
import { IInfringementAction } from 'app/shared/model/infringement-action.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-driver-demerit',
  templateUrl: './driver-demerit.component.html',
  styleUrls: ['./driver-demerit.component.scss'],
})
export class DriverDemeritComponent implements OnInit {
  displayedColumns: any[] = ['description', 'created', 'points', 'amount'];
  items: any[] = [];
  account$?: Observable<Account | null>;
  actionType: InfringementActionType | undefined;
  infringementActions?: IInfringementAction[];

  constructor(
    private accountService: AccountService,
    private driverService: DriverService,
    protected activatedRoute: ActivatedRoute,
    private infringementActionService: InfringementActionService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ actionType }) => (this.actionType = actionType));
    this.account$ = this.accountService.identity();
    this.account$.subscribe(acc => {
      const email = acc?.email ? acc?.email : '';
      return this.driverService.findByEmail(email).subscribe(driver => {
        if (driver && driver.body) {
          const driverId = driver.body?.id;
          this.infringementActionService
            .queryByDriverIdAndInfringementActionType({ driverId, infringementActionType: this.actionType })
            .subscribe((infringementActions: HttpResponse<IInfringementAction[]>) => {
              this.infringementActions = infringementActions.body || [];
            });
        }
      });
    });
  }

  showItemView(): void {}
}
