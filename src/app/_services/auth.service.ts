import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { User } from '@app/_models';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public token: string = null;

  constructor(private http: HttpClient,private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    console.log("token "+localStorage.getItem('token'))
    this.token = localStorage.getItem('token');
    this.currentUser = this.currentUserSubject.asObservable();
  }

  async checkAuthenticated() {
    if (this.currentUserValue) {
      // logged in so return true
      this.isAuthenticated.next(true);
      return true;
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    console.log("login ")
    return this.http.post<any>(`${environment.apiUrl}/auth`, { username, password });
     /* .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isAuthenticated.next(true);
        return user;
      }));*/
  }

  logout(redirect: string) {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.isAuthenticated.next(false);
    this.router.navigate([redirect]);
  }
}
