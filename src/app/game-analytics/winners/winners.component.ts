import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenerateWinnersModalComponent } from './modals/generate-winners-modal/generate-winners-modal.component';
import { GenerateWinnersPayload } from 'src/app/interfaces/generate-winners-payload.interface';
import { AppService } from 'src/app/services/app.service';
import { take } from 'rxjs';
import { WinnerInfo, Winners } from 'src/app/interfaces/winners.interface';
import { TableConfig } from 'src/app/interfaces/table-config.interface';

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
    'userEmail',
    'city',
    'score',
    'prizeName',
  ];
  columnHeaders: string[] = ['NAME', 'EMAIL', 'CITY', 'SCORE', 'PRIZE'];
  sortableColumns = ['fullName', 'city', 'score'];
  pageSizeOptions = [5, 10, 25, 50];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GenerateWinnersModalComponent>,
    private appService: AppService
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
      this.isFetching = true;
      this.generatedWinners = true;
      this.appService
        .getWinners(payload.payload)
        .pipe(take(1))
        .subscribe((winners: Winners) => {
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
        });
    });
  }
}
