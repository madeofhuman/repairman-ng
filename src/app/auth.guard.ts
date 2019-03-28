import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotifierService } from 'angular-notifier';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly notifier: NotifierService;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.notifier.notify('info', 'Login to continue to the dashboard');
      return false;
    }
  }
}
