import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { TableConfig } from 'src/app/interfaces/table-config.interface';

@Component({
  selector: 'app-reusable-datatable',
  templateUrl: './reusable-datatable.component.html',
  styleUrls: ['./reusable-datatable.component.scss'],
})
export class ReusableDatatableComponent implements OnInit, AfterViewInit {
  @Input('tableConfig') config: TableConfig;

  totalCount: number = 0;
  listData: MatTableDataSource<any>;
  displayedColumns: string[];
  columnHeaders: string[];
  sortableColumns: string[];
  pageSizeOptions: number[];
  initialPageSize: number;

  @ViewChild('userTbSort') userTbSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private datepipe: DatePipe) {}

  ngOnInit(): void {
    this.totalCount = this.config.totalCount;
    this.listData = new MatTableDataSource(this.config.data);
    this.displayedColumns = this.config.displayedColumns;
    this.columnHeaders = this.config.columnHeaders;
    this.sortableColumns = this.config.sortableColumns;
    this.pageSizeOptions = this.config.pageSizeOptions;
    this.initialPageSize = this.config.initialPageSize;
  }

  ngAfterViewInit(): void {
    this.listData.sort = this.userTbSort;
  }

  check(data) {
    if (typeof data == 'number') {
      return data;
    }

    var dateWrapper = new Date(data);
    if (isNaN(dateWrapper.getDate())) {
      return data;
    }
    return this.datepipe.transform(data, 'mediumDate');
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    // this.pageSize = event.pageSize;
    // this.currentPage = event.pageIndex;
    // this.loadData();
  }
}
