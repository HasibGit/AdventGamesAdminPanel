import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenerateWinnersModalComponent } from './modals/generate-winners-modal/generate-winners-modal.component';
import { GenerateWinnersPayload } from 'src/app/interfaces/generate-winners-payload.interface';
import { AppService } from 'src/app/services/app.service';
import { take } from 'rxjs';
import { Winners } from 'src/app/interfaces/winners.interface';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss'],
})
export class WinnersComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GenerateWinnersModalComponent>,
    private appService: AppService
  ) {}

  ngOnInit(): void {}

  openModal() {
    this.dialogRef = this.dialog.open(GenerateWinnersModalComponent, {
      autoFocus: false,
      disableClose: false,
      width: '524px',
    });

    this.dialogRef.afterClosed().subscribe((payload: any) => {
      this.appService
        .getWinners(payload.payload)
        .pipe(take(1))
        .subscribe((winners: Winners) => {
          console.log('Winners');
          console.log(winners);
        });
    });
  }
}
