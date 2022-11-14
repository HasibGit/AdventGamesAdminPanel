import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserLoginData } from 'src/app/interfaces/user-login-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  loginUser(userLoginData: UserLoginData) {
    this.http
      .post(`${environment.backendUrl}/api/Command/Authenticate`, userLoginData)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
