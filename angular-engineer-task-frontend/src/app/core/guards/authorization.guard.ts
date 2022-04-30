import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const canActive = true;
    if (canActive) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
