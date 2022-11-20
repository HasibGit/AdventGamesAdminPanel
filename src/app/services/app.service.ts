import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../interfaces/userInfo.interface';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  paginatorChange: Subject<{ pageIndex: number; pageSize: number }> =
    new Subject();

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<UserInfo>(
      `${environment.backendUrl}${API_ENDPOINTS.GET_USER_PROFILE}`
    );
  }

  isGameSelected() {
    if (sessionStorage.getItem('ag_selected_game')) {
      return true;
    }
    return false;
  }

  getPlayerBase(gameId: string, pageIndex: number, pageSize: number) {
    return this.http.get(
      `${environment.backendUrl}${API_ENDPOINTS.GET_GAME_PROFILES}`,
      {
        params: {
          pageIndex: pageIndex,
          pageSize: pageSize,
          gameId: gameId,
        },
      }
    );
  }

  timeDiffBetweenTwoDates(t1: Date, t2: Date) {
    return t1.getTime() - t2.getTime();
  }
}
