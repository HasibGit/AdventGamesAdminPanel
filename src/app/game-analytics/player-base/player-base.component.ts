import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Player } from 'src/app/interfaces/player.interface';
import { AppService } from 'src/app/services/app.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-player-base',
  templateUrl: './player-base.component.html',
  styleUrls: ['./player-base.component.scss'],
})
export class PlayerBaseComponent implements OnInit {
  constructor(
    private appService: AppService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    let selectedGame = this.tokenStorageService.getSelectedGame();
    this.getPlayers(selectedGame.gameId);
  }

  getPlayers(gameId: string) {
    this.appService
      .getPlayerBase(gameId)
      .pipe(take(1))
      .subscribe((players: Player) => {
        console.log('Game player base');
        console.log(players);
      });
  }
}
