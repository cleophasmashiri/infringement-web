import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from 'app/core/login/login.service';

@Component({
  selector: 'jhi-login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginModalComponent implements AfterViewInit, OnInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;
  redirecturl = '';
  authenticationError = false;

  _loginForm?: FormGroup;
  get loginForm(): FormGroup {
    if (!this._loginForm) {
      this._loginForm = this.fb.group({
        username: [''],
        password: [''],
        rememberMe: [false],
      });
    }
    return this._loginForm;
  }

  constructor(
    protected activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(param => {
      if (param && param['redirecturl']) {
        this.redirecturl = param['redirecturl'];
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  cancel(): void {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: '',
    });
    this.router.navigate(['/']);
  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          this.navigateToHome();
        },
        () => (this.authenticationError = true)
      );
  }

  register(): void {
    if (this.router.url && this.router.url.startsWith('/staff')) {
      this.router.navigate(['/account/register']);
    } else {
      this.router.navigate(['/driver-registration']);
    }
  }

  requestResetPassword(): void {
    this.router.navigate(['/account/reset', 'request']);
  }
  navigateToHome(): void {
    if (this.redirecturl) {
      this.router.navigate([this.redirecturl]);
    } else {
      if (this.router.url && this.router.url.startsWith('/staff')) {
        this.router.navigate(['/staff']);
      } else {
        this.router.navigate(['']);
      }
    }
  }
}
