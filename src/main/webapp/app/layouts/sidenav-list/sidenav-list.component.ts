import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private accountService: AccountService, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  navigateToRigister(): void {
    if (this.router.url.startsWith('/staff')) {
      this.router.navigate(['account/register']);
    } else {
      this.router.navigate(['driver-registration']);
    }
    this.onClose();
  }
  navigateToInfringements(): void {
    if (this.router.url.startsWith('/staff')) {
      this.router.navigate(['staff/infringements']);
    } else {
      this.router.navigate(['drivers']);
    }
    this.onClose();
  }

  onClose(): void {
    this.closeSidenav.emit();
  }

  onLogout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
