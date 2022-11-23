import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GenerateHighScorersPayload } from 'src/app/interfaces/generate-high-scorers-payload.interface';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-generate-high-scorers-modal',
  templateUrl: './generate-high-scorers-modal.component.html',
  styleUrls: ['./generate-high-scorers-modal.component.scss'],
})
export class GenerateHighScorersModalComponent implements OnInit {
  form: FormGroup;
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear()));
  timeCriteria: string = 'alltime';
  timeSpanSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<GenerateHighScorersModalComponent>,
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

  sendGenerateHighScorersFilter() {
    if (this.timeCriteria == 'date') {
      this.form.controls['toDate'].setValue(
        this.form.controls['fromDate'].value
      );
    }
    const generateHighScorersPayload: GenerateHighScorersPayload =
      this.preparePayload(this.form.getRawValue());

    this.dialogRef.close({ payload: generateHighScorersPayload });
  }

  preparePayload(data: {
    fromDate: string;
    limit: number;
    toDate: string;
    timeSpan: string;
  }) {
    const payload: GenerateHighScorersPayload = {
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
