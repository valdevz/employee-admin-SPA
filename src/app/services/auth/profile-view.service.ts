import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileViewService {
  constructor() { }

  private messageSource = new Subject<Object>();
  userChanges$ = this.messageSource.asObservable();

  changeProfile( message: Object ) {
    sessionStorage.setItem( 'user',  JSON.stringify(message))
    this.messageSource.next( message );
  }

}
