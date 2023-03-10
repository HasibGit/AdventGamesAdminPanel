export class TableConfig {
  data?: any[];
  totalCount?: number;
  displayedColumns?: string[];
  columnHeaders?: string[];
  sortableColumns?: string[];
  pageSizeOptions?: number[];
  pageIndex?: number;
  pageSize?: number;
  bindPaginatorWithTableData: boolean;
}
