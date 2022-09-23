import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private statusSource = new Subject<Object>();
  loaderChanges$ = this.statusSource.asObservable();
  constructor() { }

  loaderStatus( status: boolean ) {
    let state = status ? '1': '0';
    sessionStorage.setItem( 'loader', state )
    this.statusSource.next( status );
  }

}
