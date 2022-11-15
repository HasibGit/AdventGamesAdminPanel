import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input('userInfo') userInfo: UserInfo;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logoutUser();
  }
}
