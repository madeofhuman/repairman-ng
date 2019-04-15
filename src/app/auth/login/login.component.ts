import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly notifier: NotifierService;
  name: string;
  loading: boolean;
  userEmail: string;
  userPassword: string;
  userConfirmPassword: string;

  constructor(
  private authService: AuthService,
  private router: Router,
  notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {}

  /**
   * Submit user credentials and log user into the platform
   * @param email - user email
   * @param password - user password
   */
  submitForm(email: any, password: any) {
    if (!(email.valid && password.valid)) {
      this.displayErrorMessage('This form contains invalid fields' );
      return false;
    }

    const userCredentials = JSON.stringify({
      email: email.value,
      password: password.value
    });
    this.loading = true;

    this.authService.loginUser(userCredentials).subscribe((response) => {
      if (response) {
        this.loading = false;
        const username = response.user_info.name;
        localStorage.setItem('auth_token', response.auth_token);
        localStorage.setItem('auth_user', JSON.stringify(response.user_info));
        this.router.navigate(['/dashboard']);
        this.displaySuccessMessage('Login Successful');
      } else {
        this.loading = false;
        this.displayErrorMessage('Invalid credentials' );
        return false;
      }
    });
  }

  /**
   * Display error message
   * @param message - error message
   * @returns void
   */
  displayErrorMessage(message: string): void {
    this.notifier.notify( 'error', message);
  }

  /**
   * Display success message
   * @param message - success message
   * @returns void
   */
  displaySuccessMessage(message: string): void {
    this.notifier.notify('success', message);
  }

}
