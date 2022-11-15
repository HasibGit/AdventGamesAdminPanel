import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLoginData } from 'src/app/interfaces/user-login-data.interface';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

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

  logoutUser() {
    localStorage.removeItem('ag_token');
    this.router.navigate(['/auth']);
  }
}
