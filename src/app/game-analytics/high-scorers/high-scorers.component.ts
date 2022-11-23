import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  HighScorerInfo,
  HighScorers,
} from 'src/app/interfaces/high-scorers.interface';
import { TableConfig } from 'src/app/interfaces/table-config.interface';
import { AppService } from 'src/app/services/app.service';
import { GenerateHighScorersModalComponent } from './modals/generate-high-scorers-modal/generate-high-scorers-modal.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-high-scorers',
  templateUrl: './high-scorers.component.html',
  styleUrls: ['./high-scorers.component.scss'],
})
export class HighScorersComponent implements OnInit {
  isFetching: boolean = false;
  generatedHighScorers: boolean = false;
  tableConfig: TableConfig = {
    bindPaginatorWithTableData: false,
  };
  data: HighScorerInfo[] = [];
  displayedColumns: string[] = ['name', 'email', 'scoreDay', 'score'];
  columnHeaders: string[] = ['NAME', 'EMAIL', 'DATE', 'SCORE'];
  sortableColumns = ['name', 'scoreDay', 'score'];
  pageSizeOptions = [5, 10, 25, 50];
  timeSpan: string = '';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GenerateHighScorersModalComponent>,
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
    this.dialogRef = this.dialog.open(GenerateHighScorersModalComponent, {
      autoFocus: false,
      disableClose: false,
      width: '524px',
    });

    this.dialogRef.afterClosed().subscribe((payload: any) => {
      this.isFetching = true;
      this.generatedHighScorers = true;

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
        .getHighScorers(payload.payload)
        .pipe(take(1))
        .subscribe(
          (highScorers: HighScorers) => {
            if (highScorers && highScorers.isSuccess) {
              this.data = highScorers.result.records;
              this.tableConfig.data = this.data;
              this.tableConfig.totalCount = highScorers.result.count;
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
    });
  }
}
