import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginSigninGuard implements CanActivate {

  private readonly notifier: NotifierService;

  constructor(
    private notifierService: NotifierService,
    private authService: AuthService,
    private router: Router
  ) {
    this.notifier = notifierService;
  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const name = JSON.parse(localStorage.getItem('auth_user')).name;
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }

}
