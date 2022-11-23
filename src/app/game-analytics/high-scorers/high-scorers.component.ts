import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HighScorerInfo } from 'src/app/interfaces/high-scorers.interface';
import { TableConfig } from 'src/app/interfaces/table-config.interface';
import { AppService } from 'src/app/services/app.service';
import { GenerateHighScorersModalComponent } from './modals/generate-high-scorers-modal/generate-high-scorers-modal.component';

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

  ngOnInit(): void {}
}
