import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Task } from 'app/bpm-process/schemas/task.model';

@Component({
  selector: 'jhi-home-staff',
  templateUrl: './home-staff.component.html',
  styleUrls: ['home-staff.scss'],
})
export class HomeStaffComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  isHeading = true;
  isSubheading = true;
  isHeadingBtn = true;

  constructor(private accountService: AccountService, private loginModalService: LoginModalService) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
