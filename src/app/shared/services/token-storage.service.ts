import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  saveToken(token: string) {
    sessionStorage.setItem('ag_token', token);
  }

  saveRefreshToken(refreshToken: string) {
    sessionStorage.setItem('ag_refresh_token', refreshToken);
  }

  saveSelectedGame(game: { gameId: string; gameTitle: string }) {
    sessionStorage.setItem('ag_selected_game', JSON.stringify(game));
  }

  getToken() {
    return sessionStorage.getItem('ag_token') || '';
  }

  getRefreshToken() {
    return sessionStorage.getItem('ag_refresh_token') || '';
  }

  saveUser(user: UserInfo) {
    sessionStorage.setItem('ag_user', JSON.stringify(user));
  }

  getUser() {
    const user = sessionStorage.getItem('ag_user');
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  getSelectedGame() {
    const game = sessionStorage.getItem('ag_selected_game');
    if (game) {
      return JSON.parse(game);
    }

    return {};
  }
}
