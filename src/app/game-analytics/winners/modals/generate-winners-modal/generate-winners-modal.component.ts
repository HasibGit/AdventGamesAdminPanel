import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GenerateWinnersPayload } from 'src/app/interfaces/generate-winners-payload.interface';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

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
    private fb: FormBuilder,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      timeSpan: ['ALLTIME'],
      fromDate: [new Date(0)],
      toDate: [new Date()],
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
          this.form.controls['fromDate'].setValue(new Date());
          this.timeCriteria = 'date';
          break;
        case 'DATERANGE':
          this.form.controls['fromDate'].setValue(new Date());
          this.form.controls['toDate'].setValue(new Date());
          this.timeCriteria = 'daterange';
          break;
      }
    });
  }

  sendGenerateWinnersFilter() {
    if (this.timeCriteria == 'date') {
      this.form.controls['toDate'].setValue(
        this.form.controls['fromDate'].value
      );
    }
    const generateWinnersPayload: GenerateWinnersPayload = this.preparePayload(
      this.form.getRawValue()
    );

    this.dialogRef.close({ payload: generateWinnersPayload });
  }

  preparePayload(data: {
    fromDate: string;
    limit: number;
    toDate: string;
    timeSpan: string;
  }) {
    const payload: GenerateWinnersPayload = {
      gameId: this.tokenStorageService.getSelectedGame().gameId,
      limit: data.limit,
      filter: data.timeSpan,
      fromDate: this.modifyDate(new Date(data.fromDate)),
      toDate: this.modifyDate(new Date(data.toDate)),
    };

    return payload;
  }

  modifyDate(date: Date) {
    let modifiedDate: string = '';

    modifiedDate += date.getMonth() + 1 + '/';
    modifiedDate += date.getDate() + '/';
    modifiedDate += date.getFullYear();

    return modifiedDate;
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.timeSpanSubscription.unsubscribe();
  }
}
