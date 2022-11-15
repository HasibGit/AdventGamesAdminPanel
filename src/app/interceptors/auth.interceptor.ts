import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken: string = '';
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('skip')) {
      return next.handle(request);
    }
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${AuthInterceptor.accessToken}`,
      },
    });
    return next.handle(req);
  }
}
