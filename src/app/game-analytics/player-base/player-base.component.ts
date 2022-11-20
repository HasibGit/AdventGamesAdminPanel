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
    signupDate: string;
    lastPlayed: string;
  }[] = [];

  displayedColumns: string[] = [
    'userName',
    'userEmail',
    'lastGameScore',
    'personalBestScore',
    'signupDate',
    'lastPlayed',
  ];

  columnHeaders: string[] = [
    'Name',
    'Email',
    'Last Game Score',
    'Personal Best Score',
    'Signup Date',
    'Last Played',
  ];

  sortableColumns = [
    'userName',
    'lastGameScore',
    'personalBestScore',
    'signupDate',
    'lastPlayed',
  ];
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
              signupDate: string;
              lastPlayed: string;
            } = {
              userName: player.user.userName,
              userEmail: player.user.userEmail,
              lastGameScore: player.lastGameScore,
              personalBestScore: player.personalBestScore,
              signupDate: player.createdOn,
              lastPlayed:
                player.modifiedOn != null
                  ? player.modifiedOn
                  : player.createdOn,
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
