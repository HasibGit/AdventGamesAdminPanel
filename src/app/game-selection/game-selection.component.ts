import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { take } from 'rxjs/operators';
import { UserInfo } from '../interfaces/userInfo.interface';
@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss'],
})
export class GameSelectionComponent implements OnInit {
  username: string = '';

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService
      .getUser()
      .pipe(take(1))
      .subscribe((res: UserInfo) => {
        this.username = res.result.fullName;
      });
  }
}
