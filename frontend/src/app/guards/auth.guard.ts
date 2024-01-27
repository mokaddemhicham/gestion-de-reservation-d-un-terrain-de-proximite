/*
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
*/
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthenticationService} from "../services/authentication/authentication.service";


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.checkIsAdmin()) {
      return true;  // Allow access for admin users
    } else {
      // Redirect to a different route or show an error message
      this.router.navigate(['/terrains']);
      return false;  // Prevent access for non-admin users
    }
  }
}
