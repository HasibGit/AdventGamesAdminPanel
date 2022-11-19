import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLoginData } from 'src/app/interfaces/user-login-data.interface';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  refreshTokenSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  login(userLoginData: UserLoginData) {
    return this.http.post(
      `${environment.backendUrl}/api/Command/Authenticate`,
      userLoginData,
      {
        headers: {
          Accept: 'application/json',
          skip: 'true',
        },
      }
    );
  }

  isLoggedIn() {
    return (
      localStorage.getItem('ag_token') &&
      localStorage.getItem('ag_refresh_token') &&
      localStorage.getItem('ag_user')
    );
  }

  getToken() {
    return localStorage.getItem('ag_token') || '';
  }

  getNewToken() {
    this.refreshTokenSubscription = interval(90000).subscribe(() => {
      let payload = {
        refreshToken: this.tokenStorageService.getRefreshToken(),
        companyId: environment.companyId,
      };

      if (payload.refreshToken == '') {
        this.logoutUser();
      }

      this.http
        .post(`${environment.backendUrl}/api/Command/ValidateToken`, payload, {
          headers: {
            Accept: 'application/json',
            skip: 'true',
          },
        })
        .subscribe((res: any) => {
          if (res.externalError && res.externalError.length > 0) {
            this.logoutUser();
          }
          this.tokenStorageService.saveToken(res.result.accessToken);
          this.tokenStorageService.saveRefreshToken(res.result.refreshToken);
        });
    });
  }

  logoutUser() {
    localStorage.removeItem('ag_token');
    localStorage.removeItem('ag_refresh_token');
    localStorage.removeItem('ag_user');
    this.refreshTokenSubscription.unsubscribe();
    this.router.navigate(['/auth']);
  }
}
