import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const canActive: boolean = false;
    if (canActive) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
