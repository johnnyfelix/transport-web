import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoveFactoryService {

  private baseUrl = `${environment.apiUrl}/movementPC2F`;

  constructor(private http: HttpClient) { }

  getMoveFactory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  createMoveFactory(movefactory: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, movefactory);
  }

  updateMoveFactory(value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}`, value);
  }

  deleteMoveFactory(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllMoveFactory(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  filterMoveFactory(fromDate: any, toDate: any): Observable<any>{
    return this.http.get(`${this.baseUrl}?fromDate=${fromDate}&toDate=${toDate}`);
  }
}
