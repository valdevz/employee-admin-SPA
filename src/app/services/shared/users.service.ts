import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient  ) { }
  getAllUsers( skip: number, limit: number ): Observable<any> {
    return this.http.get( environment.API_URL + 'users/?skip=' + skip + '&limit=' + limit);
  }
  editUser( payload: object ): Observable<any> {
    return this.http.post( environment.API_URL + 'users/editUser', payload )
  }
}
