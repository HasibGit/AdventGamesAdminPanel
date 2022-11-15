import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/userInfo.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input('userInfo') userInfo: UserInfo;
  constructor() {}

  ngOnInit(): void {}
}
