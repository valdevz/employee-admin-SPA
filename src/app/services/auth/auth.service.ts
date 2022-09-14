import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  constructor( private http: HttpClient,
               public jwtHelper: JwtHelperService ) {}

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem( 'token' ) || undefined;
    return !this.jwtHelper.isTokenExpired( token );
  }

  login( user: any ): Observable<any> {
    return this.http.post( environment.API_URL + '/login' , user );
  }
}
