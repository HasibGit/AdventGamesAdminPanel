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

  isGameSelected() {
    if (localStorage.getItem('ag_selected_game')) {
      return true;
    }
    return false;
  }

  getPlayerBase(gameId: string, pageIndex = 0, pageSize = 10) {
    return this.http.get(
      `${environment.backendUrl}/api/Query/GetGameProfiles`,
      {
        params: {
          pageIndex: pageIndex,
          pageSize: pageSize,
          gameId: gameId,
        },
      }
    );
  }
}
