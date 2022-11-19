import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reusable-datatable',
  templateUrl: './reusable-datatable.component.html',
  styleUrls: ['./reusable-datatable.component.scss'],
})
export class ReusableDatatableComponent implements OnInit, AfterViewInit {
  @Input('tableConfig') config;

  listData: MatTableDataSource<any>;
  displayedColumns: string[];
  columnHeaders: string[];
  sortableColumns: string[];
  pageSizeOptions: number[];
  initialPageSize: number;

  @ViewChild('userTbSort') userTbSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private datepipe: DatePipe) {}

  ngOnInit(): void {
    this.listData = new MatTableDataSource(this.config[0]);
    this.displayedColumns = this.config[1];
    this.columnHeaders = this.config[2];
    this.sortableColumns = this.config[3];
    this.pageSizeOptions = this.config[4];
    this.initialPageSize = this.config[5];
  }

  ngAfterViewInit(): void {
    this.listData.sort = this.userTbSort;
    this.listData.paginator = this.paginator;
  }

  check(data) {
    var dateWrapper = new Date(data);
    if (isNaN(dateWrapper.getDate())) {
      return data;
    } else {
      if (!isNaN(data)) {
        return data;
      }
      return this.datepipe.transform(data, 'mediumDate');
    }
  }
}
