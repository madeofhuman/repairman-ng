import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private readonly notifier: NotifierService;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  /**
   * canActivate interface implementation
   * @returns boolean based on log in status of a user
   */
  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      this.notifier.notify('error', 'You must be an admin to access this page.');
      return false;
    }
  }
}
