import { Component, OnInit } from '@angular/core';
import { HighScorerInfo } from 'src/app/interfaces/high-scorers.interface';
import { TableConfig } from 'src/app/interfaces/table-config.interface';

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

  constructor() {}

  ngOnInit(): void {}
}
