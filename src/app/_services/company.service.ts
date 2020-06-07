import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = `${environment.apiUrl}/company`;

  constructor(private http: HttpClient) { }

  getCompany(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  createCompany(company: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, company);
  }

  updateCompany(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  getCompanies(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
