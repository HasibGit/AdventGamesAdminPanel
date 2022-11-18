import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';
import { TokenStorageService } from '../../services/token-storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent
  implements OnInit, AfterViewInit, AfterContentInit
{
  userInfo: UserInfo;
  fullName: string;
  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userInfo = this.tokenStorageService.getUser();
  }

  ngAfterViewInit(): void {}

  ngAfterContentInit(): void {
    this.fullName = this.userInfo.result.fullName;
  }

  logout() {
    this.authService.logoutUser();
  }

  onBackButtonClick() {
    this.location.back();
  }
}
