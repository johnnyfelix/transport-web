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
    this.setUserDetails();
  }

  setUserDetails(){
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    console.log("tr_token from local store "+localStorage.getItem('tr_token'))
    this.token = localStorage.getItem('tr_token');
    this.currentUser = this.currentUserSubject.asObservable();
  }

  async checkAuthenticated() {
    this.setUserDetails();
    if (this.currentUserValue && this.token) {
      // Local store has CurrentUser
      this.isAuthenticated.next(true);
      return true;
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    console.log("login request")
    return this.http.post<any>(`${environment.apiUrl}/auth`, { username, password });
  }

  logout(redirect: string) {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('tr_token');
    this.currentUserSubject.next(null);
    this.isAuthenticated.next(false);
    this.router.navigate([redirect]);
  }
}
