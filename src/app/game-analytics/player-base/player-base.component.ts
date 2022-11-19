import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Player, PlayerInfo } from 'src/app/interfaces/player.interface';
import { AppService } from 'src/app/services/app.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-player-base',
  templateUrl: './player-base.component.html',
  styleUrls: ['./player-base.component.scss'],
})
export class PlayerBaseComponent implements OnInit {
  players: Player;
  isFetching: boolean = false;
  data: {
    userName: string;
    userEmail: string;
    lastGameScore: number;
    personalBestScore: number;
  }[] = [];

  displayedColumns: string[] = [
    'userName',
    'userEmail',
    'lastGameScore',
    'personalBestScore',
  ];

  columnHeaders: string[] = [
    'Name',
    'Email',
    'Last Game Score',
    'Personal Best Score',
  ];

  sortableColumns = ['userName', 'lastGameScore', 'personalBestScore'];
  pageSizeOptions = [10];
  initialPageSize = 10;

  tableConfig = [];

  constructor(
    private appService: AppService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    let selectedGame = this.tokenStorageService.getSelectedGame();
    this.getPlayers(selectedGame.gameId);
  }

  getPlayers(gameId: string) {
    this.appService
      .getPlayerBase(gameId)
      .pipe(take(1))
      .subscribe((players: Player) => {
        this.players = players;

        if (this.players.isSuccess) {
          this.players.result.records.forEach((player: PlayerInfo) => {
            let element: {
              userName: string;
              userEmail: string;
              lastGameScore: number;
              personalBestScore: number;
            } = {
              userName: player.user.userName,
              userEmail: player.user.userEmail,
              lastGameScore: player.lastGameScore,
              personalBestScore: player.personalBestScore,
            };

            this.data.push(element);
          });

          this.tableConfig = [
            this.data,
            this.displayedColumns,
            this.columnHeaders,
            this.sortableColumns,
            this.pageSizeOptions,
            this.initialPageSize,
          ];
        }

        this.isFetching = false;
      });
  }
}
