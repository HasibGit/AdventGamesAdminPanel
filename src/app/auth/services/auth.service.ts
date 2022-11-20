import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLoginData } from 'src/app/interfaces/user-login-data.interface';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { API_ENDPOINTS } from 'src/app/constants/api-endpoints';

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
      `${environment.backendUrl}${API_ENDPOINTS.AUTHENTICATE}`,
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
      sessionStorage.getItem('ag_token') &&
      sessionStorage.getItem('ag_refresh_token') &&
      sessionStorage.getItem('ag_user')
    );
  }

  getToken() {
    return sessionStorage.getItem('ag_token') || '';
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
        .post(
          `${environment.backendUrl}${API_ENDPOINTS.VALIDATE_TOKEN}`,
          payload,
          {
            headers: {
              Accept: 'application/json',
              skip: 'true',
            },
          }
        )
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
    sessionStorage.removeItem('ag_token');
    sessionStorage.removeItem('ag_refresh_token');
    sessionStorage.removeItem('ag_user');
    sessionStorage.removeItem('ag_selected_game');
    this.refreshTokenSubscription.unsubscribe();
    this.router.navigate(['/auth']);
  }
}
