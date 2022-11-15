import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  form!: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      companyId: environment.companyId,
    });
  }

  onSubmit() {
    // console.log(this.form.getRawValue());
    this.isLoading = true;
    this.authService.login(this.form.getRawValue()).subscribe(
      (resData: any) => {
        console.log(resData);
        if (resData.externalError && resData.externalError.length > 0) {
          this.errorMessage = resData.externalError;
        }
        this.isLoading = false;
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.isLoading = false;
      }
    );
  }
}
