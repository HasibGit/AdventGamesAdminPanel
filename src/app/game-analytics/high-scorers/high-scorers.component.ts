import { Component, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}
}
