import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenerateWinnersModalComponent } from './modals/generate-winners-modal/generate-winners-modal.component';
import { GenerateWinnersPayload } from 'src/app/interfaces/generate-winners-payload.interface';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss'],
})
export class WinnersComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GenerateWinnersModalComponent>
  ) {}

  ngOnInit(): void {}

  openModal() {
    this.dialogRef = this.dialog.open(GenerateWinnersModalComponent, {
      autoFocus: false,
      disableClose: false,
      width: '524px',
    });

    this.dialogRef
      .afterClosed()
      .subscribe((payload: GenerateWinnersPayload) => {
        console.log('From parent component');
        console.log(payload);
      });
  }
}
