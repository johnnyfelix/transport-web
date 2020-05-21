import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("intercept")
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
      console.log("currentUser"+currentUser);
      console.log("token "+this.authenticationService.token)
        if (currentUser && this.authenticationService.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
          console.log("added")
        }

        return next.handle(request);
    }
}
