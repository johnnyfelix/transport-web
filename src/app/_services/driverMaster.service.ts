import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverMasterService {

  private baseUrl = `${environment.apiUrl}/driverMaster`;

  constructor(private http: HttpClient) { }

  getDriverMaster(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  createDriverMaster(driverMaster: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, driverMaster);
  }

  deleteDriverMaster(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllDriverMaster(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  searchDriverMaster(value: any): Observable<any>{
    return this.http.get(`${this.baseUrl}?query=${value}`);
  }
}
