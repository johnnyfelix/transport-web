import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleMasterService {

  private baseUrl = `${environment.apiUrl}/vehicleMaster`;

  constructor(private http: HttpClient) { }

  getVehicleMaster(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  createVehicleMaster(vehicleMaster: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, vehicleMaster);
  }

  deleteVehicleMaster(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllVehicleMaster(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  searchVehicleMaster(value: any): Observable<any>{
    if(typeof value === 'string'){
      return this.http.get(`${this.baseUrl}?query=${value}`);
    }else{
      return this.http.get(`${this.baseUrl}`);
    }
  }
}
