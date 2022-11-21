import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-generate-winners-modal',
  templateUrl: './generate-winners-modal.component.html',
  styleUrls: ['./generate-winners-modal.component.scss'],
})
export class GenerateWinnersModalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear()));
  timeCriteria: string = 'alltime';
  timeSpanSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<GenerateWinnersModalComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      timeSpan: ['ALLTIME'],
      fromDate: [''],
      toDate: [''],
      limit: [10],
    });

    this.timeSpanSubscription = this.form.controls[
      'timeSpan'
    ].valueChanges.subscribe((val) => {
      switch (val) {
        case 'ALLTIME':
          this.timeCriteria = 'alltime';
          break;
        case 'DATE':
          this.timeCriteria = 'date';
          break;
        case 'DATERANGE':
          this.timeCriteria = 'daterange';
          break;
      }
    });
  }

  sendGenerateWinnersFilter() {
    console.log(this.form.getRawValue());
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.timeSpanSubscription.unsubscribe();
  }
}
