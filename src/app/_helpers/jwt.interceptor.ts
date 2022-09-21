import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { environment_keys } from '../../environments/environment_keys'



@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor( private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token: string = sessionStorage.getItem('token') || '';
      let request = req;
      if(req.url.includes(environment.API_URL)){
      if (token) {
          request = req.clone({
            setHeaders: {
              authorization: `Bearer ${ token }`
            }
          });
        }
      } else if( req.url.includes(environment.GOOGLE_API) ){
       
        request = req.clone({
          setParams: {
            types: 'geocode',
            key: environment_keys.GOOGLE_API_KEY,
          },
        });
      }


    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('');
        }

        return throwError( err );

      })
    );
    }
}