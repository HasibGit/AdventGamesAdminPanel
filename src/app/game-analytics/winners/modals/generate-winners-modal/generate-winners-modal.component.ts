import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generate-winners-modal',
  templateUrl: './generate-winners-modal.component.html',
  styleUrls: ['./generate-winners-modal.component.scss'],
})
export class GenerateWinnersModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<GenerateWinnersModalComponent>) {}

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }
}
