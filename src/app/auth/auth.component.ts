import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { take } from 'rxjs/operators';
import { UserInfo } from '../interfaces/userInfo.interface';
import { TokenStorageService } from '../shared/services/token-storage.service';

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
    private authService: AuthService,
    private appService: AppService,
    private tokenStorageService: TokenStorageService,
    private router: Router
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
    if (this.form.valid) {
      this.isLoading = true;
      this.authService.login(this.form.getRawValue()).subscribe(
        (resData: any) => {
          console.log(resData);
          if (resData.externalError && resData.externalError.length > 0) {
            this.errorMessage = resData.externalError;
            this.isLoading = false;
            return;
          }
          localStorage.setItem('ag_token', resData.result.accessToken);
          this.appService
            .getUser()
            .pipe(take(1))
            .subscribe((user: UserInfo) => {
              this.tokenStorageService.saveUser(user);
            });
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.isLoading = false;
        }
      );
    }
  }
}
