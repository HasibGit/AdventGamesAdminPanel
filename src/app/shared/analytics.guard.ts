import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private appService: AppService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth']);
      return false;
    }

    if (!this.appService.isGameSelected()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
