import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  createUser(user: User): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/user`, user);
  }

  resetPassword(user: Object): Observable<Object> {
    return this.http.patch(`${environment.apiUrl}/user`, user);
  }

  disableUser(user: Object): Observable<Object> {
    return this.http.patch(`${environment.apiUrl}/user`, user);
  }

}
