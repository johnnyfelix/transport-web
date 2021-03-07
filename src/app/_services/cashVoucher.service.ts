import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashVoucherService {

  private baseUrl = `${environment.apiUrl}/cashvoucher`;

  constructor(private http: HttpClient) { }

  getCashVoucher(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  getCashVoucherByNumber(voucherNo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/voucherNo/${voucherNo}`);
  }

  createCashVoucher(cashVoucher: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, cashVoucher);
  }

  approveCashVoucher(id: number): Observable<Object> {
    return this.http.patch(`${this.baseUrl}/id/${id}`, null);
  }

  deleteCashVoucher(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/id/${id}`);
  }

  getAllCashVoucher(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  filterCashVoucher(vocherDate: any): Observable<any>{
    return this.http.get(`${this.baseUrl}?voucherDate=${vocherDate}`);
  }
}
