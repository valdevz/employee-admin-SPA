import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportJobsService {

  constructor( private http: HttpClient ) { }

  getAlljobs(): Observable<any> {
    return this.http.get( environment.API_URL + 'support-jobs');
  }
  editJob( payload: object ): Observable<any> {
    return this.http.put( environment.API_URL + 'support-jobs', payload)
  }

  createJob( payload: object ): Observable<any> {
    return this.http.post( environment.API_URL + 'support-jobs', payload )
  }

  deleteJob( payload: object ): Observable<any> {
    return this.http.delete( environment.API_URL + 'support-jobs', {body: payload} )
  }

}
