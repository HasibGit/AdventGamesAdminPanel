import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GenerateHighScorersPayload } from 'src/app/interfaces/generate-high-scorers-payload.interface';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

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
    private tokenStorageService: TokenStorageService,
    private utilityService: UtilityService
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
      fromDate: this.modifyStartDate(new Date(data.fromDate)),
      toDate: this.modifyEndDate(new Date(data.toDate)),
    };

    return payload;
  }

  modifyStartDate(date: Date) {
    let modifiedDate: string = '';
    modifiedDate += date.getDate() + '-';
    modifiedDate += this.utilityService.getMonthName(date.getMonth()) + '-';
    modifiedDate += date.getFullYear() + ' ';
    modifiedDate += '00:00:00';

    return modifiedDate;
  }

  modifyEndDate(date: Date) {
    let modifiedDate: string = '';
    modifiedDate += date.getDate() + '-';
    modifiedDate += this.utilityService.getMonthName(date.getMonth()) + '-';
    modifiedDate += date.getFullYear() + ' ';
    modifiedDate += '23:59:59';

    return modifiedDate;
  }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.timeSpanSubscription.unsubscribe();
  }
}
