import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${currentUser.token}`,
                  'x-api-key': 'fZOjA606gvLdn27y93DAlYNP9KrIhC7x'
                }
            });
        }else {
          request = request.clone({
            setHeaders: {
              'x-api-key': 'fZOjA606gvLdn27y93DAlYNP9KrIhC7x'
            }
          });
        }
        return next.handle(request);
    }
}
