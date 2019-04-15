import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private readonly notifier: NotifierService;
  name: string;
  loading: boolean;
  userEmail: string;
  userPassword: string;
  userConfirmPassword: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notifierService: NotifierService
    ) {
      this.notifier = notifierService;
    }

  ngOnInit() {}

    /**
     * Submit new user credentials and persist user information in the database
     * @param username - users preferred name
     * @param email - users email
     * @param password - users password
     * @param confirmPassword - user password confirmation
     */
  submitForm(username: any, email: any, password: any, confirmPassword: any) {
    if (!(username.valid && email.valid && password.valid)) {
      this.displayErrorMessage('This form contains invalid fields' );
      return false;
    }
    if (password.value !== confirmPassword.value) {
      this.displayErrorMessage('The supplied passwords do not match' );
      return false;
    }

    const userObject = JSON.stringify({
      name: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    });
    this.loading = true;

    this.authService.registerUser(userObject).subscribe((response) => {
      if (response) {
        if (response.status === 201) {
          this.loading = false;
          const name = response.user_info.name;
          localStorage.setItem('auth_token', response.auth_token);
          localStorage.setItem('auth_user', JSON.stringify(response.user_info));
          this.router.navigate(['/dashboard']);
          this.displaySuccessMessage('Sign up Successful');

        } else if (response.status === 200) {
          this.displayErrorMessage('This username/email already exists in the database' );
          return this.loading = false;
        }
      } else {
        this.displayErrorMessage('There was an error creating your account. Please try again' );
        return this.loading = false;
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
