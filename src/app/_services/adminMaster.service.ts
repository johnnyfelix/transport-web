import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminMasterService {

  private baseAdminMasterTypeUrl = `${environment.apiUrl}/adminMasterType`;
  private baseAdminMasterUrl = `${environment.apiUrl}/adminMaster`;
  private MOVEMENT_TYPE = 'MOVEMENT_TYPE';
  private LOCATION = 'LOCATION';
  private PORT = 'PORT';
  private CFS = 'CFS';
  private VEHICLE_TYPE = 'VEHICLE_TYPE';

  constructor(private http: HttpClient) { }

  getAdminMasterType(): Observable<any> {
    console.log("calling getAdminMasterType"+this.baseAdminMasterTypeUrl)
    return this.http.get(`${this.baseAdminMasterTypeUrl}`);
  }

  getAdminMaster(type: string): Observable<any> {
    return this.http.get(`${this.baseAdminMasterUrl}?type=${type}`);
  }

  searchAdminMaster(type: string, query: string): Observable<any> {
    return this.http.get(`${this.baseAdminMasterUrl}?type=${type}&query=${query}`);
  }

  createAdminMaster(adminMaster: Object): Observable<Object> {
    return this.http.post(`${this.baseAdminMasterUrl}`, adminMaster);
  }

  deleteAdminMaster(id: number): Observable<Object> {
    return this.http.delete(`${this.baseAdminMasterUrl}/${id}`);
  }

  getAdminMasterValues(type: string): Observable<any> {
    return this.http.get(`${this.baseAdminMasterUrl}/type/${type}`);
  }

  searchMovementTypes(query: string): Observable<any> {
    return this.http.get(`${this.baseAdminMasterUrl}/type/${this.MOVEMENT_TYPE}?query=${query}`);
  }

  searchVehicleTypes(query: string): Observable<any> {
    return this.http.get(`${this.baseAdminMasterUrl}/type/${this.VEHICLE_TYPE}?query=${query}`);
  }

  searchLocations(query: string): Observable<any> {
    return this.http.get(`${this.baseAdminMasterUrl}/type/${this.LOCATION}?query=${query}`);
  }

  searchPORT(query: string): Observable<any> {
    return this.http.get(`${this.baseAdminMasterUrl}/type/${this.PORT}?query=${query}`);
  }

  searchCFS(query: string): Observable<any> {
    return this.http.get(`${this.baseAdminMasterUrl}/type/${this.CFS}?query=${query}`);
  }
}
