import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsigneeMasterService {

  private baseUrl = `${environment.apiUrl}/consigneeMaster`;

  constructor(private http: HttpClient) { }

  getConsigneeMaster(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  createConsigneeMaster(consigneeMaster: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, consigneeMaster);
  }

  deleteConsigneeMaster(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllConsigneeMaster(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  searchConsigneeMaster(value: any): Observable<any>{
    if(typeof value === 'string'){
      return this.http.get(`${this.baseUrl}?query=${value}`);
    }else{
      return this.http.get(`${this.baseUrl}`);
    }
  }
}
