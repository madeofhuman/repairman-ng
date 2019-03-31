import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly notifier: NotifierService;
  name: string;
  userEmail: string;
  userPassword: string;
  userConfirmPassword: string;
  loading: boolean;

  constructor(
  private authService: AuthService,
  private router: Router,
  notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
  }

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

  displayErrorMessage(message: string): void {
    this.notifier.notify( 'error', message);
  }

  displaySuccessMessage(message: string): void {
    this.notifier.notify('success', message);
  }

}
