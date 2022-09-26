import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuburbsService {

  constructor( private http: HttpClient ) { }

  getAllSuburbs(): Observable<any> {
    return this.http.get( environment.API_URL + 'suburbs' );
  }

  editSuburb( payload: object ): Observable<any> {
    return this.http.put( environment.API_URL + 'suburbs',  payload )
  }

  deleteSuburb( payload: object): Observable<any> {
    return this.http.delete( environment.API_URL + 'suburbs', {body: payload} )
  }

  createSuburb( payload: object ): Observable<any> {
    return this.http.post( environment.API_URL + 'suburbs', payload )
  }

}
