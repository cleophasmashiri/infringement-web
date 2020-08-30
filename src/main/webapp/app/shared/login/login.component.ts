import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'app/core/login/login.service';

@Component({
  selector: 'jhi-login-modal',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginModalComponent implements AfterViewInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;

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

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {}

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
          // this.activeModal.close();
          if (
            this.router.url === '/account/register' ||
            this.router.url.startsWith('/account/activate') ||
            this.router.url.startsWith('/account/reset/')
          ) {
            this.router.navigate(['']);
          }
        },
        () => (this.authenticationError = true)
      );
  }

  register(): void {
    // this.activeModal.dismiss('to state register');
    this.router.navigate(['/account/register']);
  }

  requestResetPassword(): void {
    // this.activeModal.dismiss('to state requestReset');
    this.router.navigate(['/account/reset', 'request']);
  }
}
