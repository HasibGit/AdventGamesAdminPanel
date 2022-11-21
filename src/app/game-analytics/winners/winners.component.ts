import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenerateWinnersModalComponent } from './modals/generate-winners-modal/generate-winners-modal.component';

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
    this.dialog.open(GenerateWinnersModalComponent, {
      autoFocus: false,
      disableClose: false,
      width: '524px',
    });
  }
}
