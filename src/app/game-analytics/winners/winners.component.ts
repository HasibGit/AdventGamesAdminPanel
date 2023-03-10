import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenerateWinnersModalComponent } from './modals/generate-winners-modal/generate-winners-modal.component';
import { GenerateWinnersPayload } from 'src/app/interfaces/generate-winners-payload.interface';
import { AppService } from 'src/app/services/app.service';
import { take } from 'rxjs';
import { WinnerInfo, Winners } from 'src/app/interfaces/winners.interface';
import { TableConfig } from 'src/app/interfaces/table-config.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss'],
})
export class WinnersComponent implements OnInit {
  isFetching: boolean = false;
  generatedWinners: boolean = false;
  tableConfig: TableConfig = {
    bindPaginatorWithTableData: false,
  };
  data: WinnerInfo[] = [];
  displayedColumns: string[] = [
    'fullName',
    'userName',
    'userEmail',
    'city',
    'score',
    'scoreDay',
    'prizeName',
  ];
  columnHeaders: string[] = [
    'FULL NAME',
    'USER NAME',
    'EMAIL',
    'CITY',
    'SCORE',
    'SCORE DAY',
    'PRIZE',
  ];
  sortableColumns = ['fullName', 'userName', 'city', 'score', 'scoreDay'];
  pageSizeOptions = [5, 10, 25, 50];
  timeSpan: string = '';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GenerateWinnersModalComponent>,
    private appService: AppService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.setInitialTableState();
  }

  setInitialTableState() {
    this.tableConfig.data = this.data;
    this.tableConfig.totalCount = 0;
    this.tableConfig.displayedColumns = this.displayedColumns;
    this.tableConfig.columnHeaders = this.columnHeaders;
    this.tableConfig.sortableColumns = this.sortableColumns;
    this.tableConfig.pageSizeOptions = this.pageSizeOptions;
    this.tableConfig.pageIndex = 0;
    this.tableConfig.pageSize = 10;
    this.tableConfig.bindPaginatorWithTableData = true;
    this.isFetching = false;
  }

  openModal() {
    this.dialogRef = this.dialog.open(GenerateWinnersModalComponent, {
      autoFocus: false,
      disableClose: false,
      width: '524px',
    });

    this.dialogRef.afterClosed().subscribe((payload: any) => {
      if (payload && payload != undefined) {
        this.isFetching = true;
        this.generatedWinners = true;

        if (payload.payload.filter == 'ALLTIME') {
          this.timeSpan = 'All Time';
        } else {
          if (payload.payload.filter == 'DATE') {
            this.timeSpan = this.datepipe.transform(
              payload.payload.fromDate,
              'mediumDate'
            );
          } else if (payload.payload.filter == 'DATERANGE') {
            this.timeSpan =
              this.datepipe.transform(payload.payload.fromDate, 'mediumDate') +
              ' - ' +
              this.datepipe.transform(payload.payload.toDate, 'mediumDate');
          }
        }

        this.appService
          .getWinners(payload.payload)
          .pipe(take(1))
          .subscribe(
            (winners: Winners) => {
              if (
                winners &&
                winners.errors &&
                winners.errors.errors.length > 0
              ) {
                alert(winners.errors.errors[0]);
                this.isFetching = false;
                return;
              }

              if (winners && winners.isSuccess) {
                this.data = winners.result.records;
                this.tableConfig.data = this.data;
                this.tableConfig.totalCount = winners.result.count;
                this.tableConfig.displayedColumns = this.displayedColumns;
                this.tableConfig.columnHeaders = this.columnHeaders;
                this.tableConfig.sortableColumns = this.sortableColumns;
                this.tableConfig.pageSizeOptions = this.pageSizeOptions;
                this.tableConfig.pageIndex = 0;
                this.tableConfig.pageSize = 10;
                this.tableConfig.bindPaginatorWithTableData = true;

                this.isFetching = false;
              }
            },
            (error) => {
              this.isFetching = false;
              alert('Sorry, something went wrong');
            }
          );
      }
    });
  }
}
