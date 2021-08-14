import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HttpCustomErrorInterceptor implements HttpInterceptor {

    constructor(
        private route: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                tap({
                    error: (res) => {
                        switch (res.status) {
                            case 401:
                            case 403:
                                this.route.navigate(['/access']);
                                break;
                            case 404:
                                this.route.navigate(['/notfound']);
                                break;
                            default:
                                this.route.navigate(['/error']);
                                break;
                        }
                    }
                }),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    return throwError(errorMessage);
                })
            )
    }
}