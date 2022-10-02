import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment'
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  constructor( private http: HttpClient,
               public jwtHelper: JwtHelperService ) {}

    private messageStatus = new Subject<Object>();
    signInStatus$ = this.messageStatus.asObservable();

    public isAuthenticated(): boolean {
      const token = sessionStorage.getItem( 'token' ) || undefined;
      this.messageStatus.next( !this.jwtHelper.isTokenExpired( token ) );
      return !this.jwtHelper.isTokenExpired( token );
    }

    public getCurrentRol(): string {
      const token = sessionStorage.getItem( 'token' ) || undefined;
      let rol =  this.jwtHelper.decodeToken( token ).rol;
      return typeof rol == 'string' ? rol : ''; 
    }

    login( user: any ): Observable<any> {
      return this.http.post( environment.API_URL + '/login' , user );
    }
}
