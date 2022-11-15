import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private inject: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('skip')) {
      return next.handle(request);
    }

    let authService = this.inject.get(AuthService);

    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.router.navigate(['/auth']);
        }
        return throwError(() => err);
      })
    );
  }
}
