import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { Player, PlayerInfo } from 'src/app/interfaces/player.interface';
import {
  UserProfiles,
  UserDetails,
} from 'src/app/interfaces/user-profiles.interface';
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
  players: UserProfiles;
  isFetching: boolean = false;
  tableConfig: TableConfig = {};
  timeAgo: TimeAgo;
  paginatorChangeSubscription: Subscription;

  data: {
    fullName: string;
    email: string;
    city: string;
    signupDate: string;
    subscription: boolean;
  }[] = [];

  displayedColumns: string[] = [
    'fullName',
    'email',
    'city',
    'signupDate',
    'subscription',
  ];

  columnHeaders: string[] = [
    'NAME',
    'EMAIL',
    'CITY',
    'SIGNUP DATE',
    'SUBSCRIPTION',
  ];

  sortableColumns = ['fullName', 'signupDate', 'subscription'];
  pageSizeOptions = [5, 10, 25, 50];

  constructor(
    private appService: AppService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.paginationChangeSubscribe();
    this.isFetching = true;
    this.timeAgo = new TimeAgo('en-US');
    this.getPlayers(0, 10);
  }

  paginationChangeSubscribe() {
    this.paginatorChangeSubscription =
      this.appService.paginatorChange.subscribe(
        (pageState: { pageIndex: number; pageSize: number }) => {
          if (pageState) {
            this.isFetching = true;
            this.getPlayers(pageState.pageIndex, pageState.pageSize);
          }
        }
      );
  }

  getPlayers(pageIndex: number, pageSize: number) {
    this.data = [];
    this.appService
      .getPlayerBase(pageIndex, pageSize)
      .pipe(take(1))
      .subscribe((players: UserProfiles) => {
        this.players = players;

        if (this.players.isSuccess) {
          this.players.result.records.forEach((player: UserDetails) => {
            // let modifiedOn: Date = new Date(
            //   player.modifiedOn != null ? player.modifiedOn : player.createdOn
            // );

            // let lastModifiedInMilliseconds =
            //   this.appService.timeDiffBetweenTwoDates(new Date(), modifiedOn);

            let element: {
              fullName: string;
              email: string;
              city: string;
              signupDate: string;
              subscription: boolean;
            } = {
              fullName: player.fullName,
              email: player.email,
              city: player.city,
              signupDate: player.createdOn,
              subscription:
                player.metaData.SubscribedNewsletters == 'True' ? true : false,
              // userName: player.user.userName,
              // userEmail: player.user.userEmail,
              // lastGameScore: player.lastGameScore,
              // personalBestScore: player.personalBestScore,
              // signupDate: player.createdOn,
              // lastPlayed: this.timeAgo.format(
              //   Date.now() - lastModifiedInMilliseconds
              // ),
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
