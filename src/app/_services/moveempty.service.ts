import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoveEmptyService {

  private baseUrl = `${environment.apiUrl}/movementEmpty`;

  constructor(private http: HttpClient) { }

  getMoveEmpty(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  createMoveEmpty(moveEmpty: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, moveEmpty);
  }

  updateMoveEmpty(value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}`, value);
  }

  deleteMoveEmpty(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllMoveEmpty(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  filterMoveEmpty(fromDate: any, toDate: any): Observable<any>{
    return this.http.get(`${this.baseUrl}?fromDate=${fromDate}&toDate=${toDate}`);
  }
}
