import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
    }

    //here is where we'd call login page, and pass a callback url
    window.location.href="http://localhost:4200/callback?token=atoken&returnRoute=" + state.url;

    return false;
  }
}