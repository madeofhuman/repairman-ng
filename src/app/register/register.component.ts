import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  localErrors: object;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(username: any, email: any, password: any, confirmPassword: any) {
    console.log(username.value, email.value, password.value, confirmPassword.value);
    if (!(username.valid && email.valid && password.valid)) {
      this.localErrors = { invalidFields: true };
      setTimeout(() => this.clearErrors(), 5000);
      return false;
    }
    if (password.value !== confirmPassword.value) {
      this.localErrors = { passwordConfirmed: true };
      setTimeout(() => this.clearErrors(), 5000);
      return false;
    }

    const userObject = JSON.stringify({
      name: username.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    });

    this.authService.registerUser(userObject).subscribe((response) => {
      if (response.status === 201) {
        localStorage.setItem('auth_token', response.auth_token);
        localStorage.setItem('auth_user', JSON.stringify(response.user_info));
        this.router.navigate(['/dashboard']);
      } else if (response.status === 200) {
        this.localErrors = { existingUser: true };
        setTimeout(() => this.clearErrors(), 5000);
        return false;
      } else {
        this.localErrors = { serverError: true };
        setTimeout(() => this.clearErrors(), 5000);
        return false;
      }
    });

  }

  clearErrors() {
    this.localErrors = null;
  }

}
