import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../interfaces/userInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<UserInfo>(
      `${environment.backendUrl}/api/Query/GetUserProfile`
    );
  }
}
