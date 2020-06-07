import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      //console.log("--intercept-- URL " + request.url)
        if(request.url.endsWith("auth"))
          return next.handle(request);
        // add authorization header with jwt token if available except auth request
        if (this.authenticationService.checkAuthenticated()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authenticationService.token}`
                }
            });
        }
        return next.handle(request);
    }
}
