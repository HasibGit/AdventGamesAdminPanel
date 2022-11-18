import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BreadCrumbLink } from 'src/app/interfaces/breadcrumb.interface';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent
  implements OnInit, AfterViewInit, AfterContentInit, OnDestroy
{
  userInfo: UserInfo;
  fullName: string;
  breadcrumbSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.tokenStorageService.getUser();
    this.breadcrumbSubscription = this.breadcrumbService.breadcrumb.subscribe(
      (response: BreadCrumbLink[]) => {
        console.log('FROM NAVBAR COMPONENT');
        console.log(response);
      }
    );
  }

  ngAfterViewInit(): void {}

  ngAfterContentInit(): void {
    this.fullName = this.userInfo.result.fullName;
  }

  logout() {
    this.authService.logoutUser();
  }

  ngOnDestroy(): void {
    this.breadcrumbSubscription.unsubscribe();
  }
}
