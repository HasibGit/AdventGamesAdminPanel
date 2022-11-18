import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BreadCrumbLink } from 'src/app/interfaces/breadcrumb.interface';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumb = new Subject<BreadCrumbLink[]>();
  constructor() {}
}
