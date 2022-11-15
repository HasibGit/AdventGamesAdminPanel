import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLoginData } from 'src/app/interfaces/user-login-data.interface';
import { Router } from '@angular/router';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  handleLogin(userLoginData: UserLoginData) {
    this.http
      .post(
        `${environment.backendUrl}/api/Command/Authenticate`,
        userLoginData,
        {
          headers: {
            Accept: 'application/json',
            skip: 'true',
          },
        }
      )
      .subscribe((res: any) => {
        AuthInterceptor.accessToken = res.result.accessToken;
        this.router.navigate(['/']);
      });
  }
}
