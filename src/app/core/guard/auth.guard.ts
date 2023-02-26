import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionQuery } from '../state/session/session.query';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(public sessionQuery: SessionQuery, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.sessionQuery.getValue()) {
      const loggedIn = this.sessionQuery.getValue();
      if(loggedIn && loggedIn.id) {
        return true;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}