import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userInfo: UserInfo;
  fullName: string;
  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.tokenStorageService.getUser();
    this.fullName = this.userInfo.result.fullName;
  }

  logout() {
    this.authService.logoutUser();
  }
}
