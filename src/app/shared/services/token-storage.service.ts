import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  saveToken(token: string) {
    localStorage.setItem('ag_token', token);
  }

  saveRefreshToken(refreshToken: string) {
    localStorage.setItem('ag_refresh_token', refreshToken);
  }

  saveSelectedGame(game: { gameId: string; gameTitle: string }) {
    localStorage.setItem('ag_selected_game', JSON.stringify(game));
  }

  getToken() {
    return localStorage.getItem('ag_token') || '';
  }

  getRefreshToken() {
    return localStorage.getItem('ag_refresh_token') || '';
  }

  saveUser(user: UserInfo) {
    localStorage.setItem('ag_user', JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem('ag_user');
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  getSelectedGame() {
    const game = localStorage.getItem('ag_selected_game');
    if (game) {
      return JSON.parse(game);
    }

    return {};
  }
}
