import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http: HttpClient ) { }
  search( user: any ): Observable<any> {
    return this.http.get( environment.API_URL + '/users/byFilter?name=' + user);
  }
  searchById( userId: string ): Observable<any> {
    return this.http.get( environment.API_URL + 'users/' + userId )
  }
}
