import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/core/language/language.constants';
import { AccountService } from 'app/core/auth/account.service';
import { LoginModalService } from 'app/core/login/login-modal.service';
import { LoginService } from 'app/core/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  swaggerEnabled?: boolean;
  version: string;
  @Output() sidenavToggle = new EventEmitter<void>();

  get baseUrl(): string {
    let x = this.router.url;
    // eslint-disable-next-line no-console
    console.log(' this.router.url.', x);
    return '';
  }

  constructor(
    private loginService: LoginService,
    private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private profileService: ProfileService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.version = VERSION ? (VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION) : '';
  }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(x => {
      // eslint-disable-next-line no-console
      console.log(' this.router.url............', x);
    });

    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.swaggerEnabled = profileInfo.swaggerEnabled;
    });
  }

  navigateToInfringements(): void {
    if (this.router.url.startsWith('/staff')) {
      this.router.navigate(['staff/infringements']);
    } else {
      this.router.navigate(['drivers']);
    }
  }
  navigateToRigister(): void {
    if (this.router.url.startsWith('/staff')) {
      this.router.navigate(['account/register']);
    } else {
      this.router.navigate(['driver-registration']);
    }
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.languageService.changeLanguage(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl(): string {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
  }

  onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }
}
