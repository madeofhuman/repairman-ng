import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registrationRoute = 'http://localhost:3000/signup';
  private loginRoute = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) { }

  registerUser(user: string) {
    return this.http.post<any>(this.registrationRoute, user, httpOptions);
  }

  loginUser(user: string) {
    return this.http.post<any>(this.loginRoute, user, httpOptions);
  }
}
