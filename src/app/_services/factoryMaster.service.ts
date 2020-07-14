import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactoryMasterService {

  private baseUrl = `${environment.apiUrl}/factoryMaster`;

  constructor(private http: HttpClient) { }

  getFactoryMaster(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  createFactoryMaster(factoryMaster: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, factoryMaster);
  }

  deleteFactoryMaster(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllFactoryMaster(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  searchFactoryMaster(value: any): Observable<any>{
    return this.http.get(`${this.baseUrl}?query=${value}`);
  }
}
