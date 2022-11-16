import { Component, OnInit } from '@angular/core';
import { GAMES } from '../constants/company-games';
import { GameCard } from '../interfaces/game-card.interface';

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss'],
})
export class GameSelectionComponent implements OnInit {
  games: GameCard[] = GAMES;

  constructor() {}

  ngOnInit(): void {}
}
