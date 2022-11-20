import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { Player, PlayerInfo } from 'src/app/interfaces/player.interface';
import { AppService } from 'src/app/services/app.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { TableConfig } from 'src/app/interfaces/table-config.interface';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addDefaultLocale(en);

@Component({
  selector: 'app-player-base',
  templateUrl: './player-base.component.html',
  styleUrls: ['./player-base.component.scss'],
})
export class PlayerBaseComponent implements OnInit, OnDestroy {
  players: Player;
  isFetching: boolean = false;
  tableConfig: TableConfig = {};
  timeAgo: TimeAgo;
  paginatorChangeSubscription: Subscription;

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
  pageSizeOptions = [5, 10, 25, 50];

  constructor(
    private appService: AppService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.paginationChangeSubscribe();
    this.isFetching = true;
    this.timeAgo = new TimeAgo('en-US');
    let selectedGame = this.tokenStorageService.getSelectedGame();
    this.getPlayers(selectedGame.gameId, 0, 10);
  }

  paginationChangeSubscribe() {
    this.paginatorChangeSubscription =
      this.appService.paginatorChange.subscribe(
        (pageState: { pageIndex: number; pageSize: number }) => {
          if (pageState) {
            this.isFetching = true;
            let selectedGame = this.tokenStorageService.getSelectedGame();
            this.getPlayers(
              selectedGame.gameId,
              pageState.pageIndex,
              pageState.pageSize
            );
          }
        }
      );
  }

  getPlayers(gameId: string, pageIndex: number, pageSize: number) {
    this.data = [];
    this.appService
      .getPlayerBase(gameId, pageIndex, pageSize)
      .pipe(take(1))
      .subscribe((players: Player) => {
        this.players = players;

        if (this.players.isSuccess) {
          this.players.result.records.forEach((player: PlayerInfo) => {
            let modifiedOn: Date = new Date(
              player.modifiedOn != null ? player.modifiedOn : player.createdOn
            );

            let lastModifiedInMilliseconds =
              this.appService.timeDiffBetweenTwoDates(new Date(), modifiedOn);

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
              lastPlayed: this.timeAgo.format(
                Date.now() - lastModifiedInMilliseconds
              ),
            };

            this.data.push(element);
          });

          this.tableConfig.data = this.data;
          this.tableConfig.totalCount = this.players.result.count;
          this.tableConfig.displayedColumns = this.displayedColumns;
          this.tableConfig.columnHeaders = this.columnHeaders;
          this.tableConfig.sortableColumns = this.sortableColumns;
          this.tableConfig.pageSizeOptions = this.pageSizeOptions;
          this.tableConfig.pageIndex = pageIndex;
          this.tableConfig.pageSize = pageSize;
        }

        this.isFetching = false;
      });
  }

  ngOnDestroy(): void {
    this.paginatorChangeSubscription.unsubscribe();
  }
}
