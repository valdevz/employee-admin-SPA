import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRolsService {

  constructor( private http: HttpClient ) { }

  getAllRols(): Observable<any> {
    return this.http.get( environment.API_URL + 'employee-rols' );
  }

  editRol( payload: object ): Observable<any> {
    return this.http.put( environment.API_URL + 'employee-rols',  payload )
  }

  deleteRol( payload: object): Observable<any> {
    return this.http.delete( environment.API_URL + 'employee-rols', {body: payload} )
  }

  createRol( payload: object ): Observable<any> {
    return this.http.post( environment.API_URL + 'employee-rols', payload )
  }
}
