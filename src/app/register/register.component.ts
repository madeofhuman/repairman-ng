import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private readonly notifier: NotifierService;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
    ) {
      this.notifier = notifierService;
    }

  ngOnInit() { }

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

    this.authService.registerUser(userObject).subscribe((response) => {
      if (response) {
        if (response.status === 201) {
          const name = response.user_info.name;
          localStorage.setItem('auth_token', response.auth_token);
          localStorage.setItem('auth_user', JSON.stringify(response.user_info));
          this.router.navigate(['/dashboard']);
          this.displaySuccessMessage(`Sign up Successful. Welcome ${name}`);

        } else if (response.status === 200) {
          this.displayErrorMessage('This username/email already exists in the database' );
          return false;
        }
      } else {
        this.displayErrorMessage('There was an error creating your account. Please try again' );
        return false;
      }
    });

  }

  displayErrorMessage(message: string): void {
    this.notifier.notify( 'error', message);
  }

  displaySuccessMessage(message: string): void {
    this.notifier.notify('success', message);
  }

}
