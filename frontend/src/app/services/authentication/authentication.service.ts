// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/users'; // Replace with your API URL
  private isAdmin: boolean = false;
  private isLogged: boolean = false;
  constructor(private http: HttpClient) {}

  signIn(credentials: { email: string; password: string }): Observable<any> {
    console.log("credentials",credentials);
    // Implement the logic to send a sign-in request to your backend
    this.isLogged = true;
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  handleSuccessfulSignIn(response: any): void {
    // Store user data in sessionStorage after successful sign-in
    this.isLogged = true;
    console.log("response",response);
    sessionStorage.setItem('user', JSON.stringify(response));
  }
  //
  public checkIsAdmin(): boolean {
    var userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.isAdmin = user.role === 'admin';
      console.log(this.isAdmin)
    }
    return this.isAdmin;
  }

  isLoggedIn() {
    return this.isLogged;
  }
}
