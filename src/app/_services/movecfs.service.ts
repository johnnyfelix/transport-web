import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovecfsService {

  private baseUrl = `${environment.apiUrl}/movementP2C`;

  constructor(private http: HttpClient) { }

  getMoveCfs(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  createMoveCfs(movecfs: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, movecfs);
  }

  updateMoveCfs(value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}`, value);
  }

  deleteMoveCfs(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllMoveCfs(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  filterMoveCfs(fromDate: any, toDate: any): Observable<any>{
    return this.http.get(`${this.baseUrl}?fromDate=${fromDate}&toDate=${toDate}`);
  }
}
