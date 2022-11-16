import { Component, OnInit } from '@angular/core';
import { GAME_ANALYTICS } from '../constants/analytics';
import { GameAnalytics } from '../interfaces/game-analytics.interface';

@Component({
  selector: 'app-game-analytics',
  templateUrl: './game-analytics.component.html',
  styleUrls: ['./game-analytics.component.scss'],
})
export class GameAnalyticsComponent implements OnInit {
  gameAnalytics: GameAnalytics[] = GAME_ANALYTICS;

  constructor() {}

  ngOnInit(): void {}
}
