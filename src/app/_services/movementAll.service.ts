import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovementAllService {

  private baseUrl = `${environment.apiUrl}/movementAll`;

  constructor(private http: HttpClient) { }

  getAllMovements(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  filterMoveCfs(fromDate: any, toDate: any): Observable<any>{
    return this.http.get(`${this.baseUrl}?fromDate=${fromDate}&toDate=${toDate}`);
  }
}
