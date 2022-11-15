import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(`${environment.backendUrl}/api/Query/GetUserProfile`);
  }
}
