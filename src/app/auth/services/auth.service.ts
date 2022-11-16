import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLoginData } from 'src/app/interfaces/user-login-data.interface';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
    return localStorage.getItem('ag_token') != null;
  }

  getToken() {
    return localStorage.getItem('ag_token') || '';
  }

  getNewToken() {
    interval(120000).subscribe(() => {
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
        .pipe(take(1))
        .subscribe((res: any) => {
          if (res.externalError && res.externalError.length > 0) {
            this.logoutUser();
          }
          this.tokenStorageService.saveToken(res.result.accessToken);
          this.tokenStorageService.saveRefreshToken(
            res.result.saveRefreshToken
          );
        });
    });
  }

  logoutUser() {
    localStorage.removeItem('ag_token');
    localStorage.removeItem('ag_refresh_token');
    localStorage.removeItem('ag_user');
    this.router.navigate(['/auth']);
  }
}
