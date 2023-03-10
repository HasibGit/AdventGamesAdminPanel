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
          if (resData.externalError && resData.externalError.length > 0) {
            this.errorMessage = resData.externalError;
            this.isLoading = false;
            return;
          }
          this.tokenStorageService.saveToken(resData.result.accessToken);
          this.tokenStorageService.saveRefreshToken(
            resData.result.refreshToken
          );
          this.appService
            .getUser()
            .pipe(take(1))
            .subscribe(
              (user: UserInfo) => {
                if (!user.isSuccess && user.errors && user.errors.errors[0]) {
                  alert(user.errors.errors[0]);
                  this.isLoading = false;
                  this.router.navigate(['/auth']);
                  return;
                }

                this.tokenStorageService.saveUser(user);
                this.authService.getNewToken(); // keep getting access token from refresh token after logging in
                this.isLoading = false;
                this.router.navigate(['/']);
              },
              (error) => {
                alert('Sorry, something went wrong!');
                this.isLoading = false;
              }
            );
        },
        (errorMessage) => {
          alert('Sorry, something went wrong!');
          this.isLoading = false;
        }
      );
    }
  }
}
