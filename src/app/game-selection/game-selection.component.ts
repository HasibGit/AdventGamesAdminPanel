import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss'],
})
export class GameSelectionComponent implements OnInit {
  username: string = '';

  constructor(private http: HttpClient, private appService: AppService) {}

  ngOnInit(): void {
    this.appService
      .getUser()
      .pipe(take(1))
      .subscribe((res: any) => {
        console.log('User Info');
        console.log(res);
        this.username = res.result.fullName;
      });
  }
}
