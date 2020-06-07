import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '@environments/environment';
import { Movecfs } from '@app/_models';
import {map} from 'rxjs/operators';

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
  getAllMoveCfs(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  findMoveCfs( filter = '', sortOrder = 'asc',
              pageNumber = 0, pageSize = 3): Observable<Movecfs[]>{
    console.log("Find findMoveCfs")
    return this.http.get(`${this.baseUrl}`).pipe(
      map(res =>  res["payload"])
    );

  }
}
