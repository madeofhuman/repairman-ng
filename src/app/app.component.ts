import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private readonly notifier: NotifierService;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  /**
   * Logout function - remove user credentials from local
   * storage and redirect the user to the homepage
   */
  logOut(): void {
    this.notifier.hideAll();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.router.navigate(['/']);
    this.notifier.notify('info', 'You have successfully logged out of the platform!');
  }

  /**
   * Verify user login status
   * @returns boolean by subscribing to our authentication service
   */
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  /**
   * Verify user admin status
   * @returns boolean by subscribing to our authentication service
   */
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
