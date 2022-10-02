import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEditorGuardGuard implements CanActivate {
  constructor( public auth: AuthService, public router: Router ){}
  canActivate( ): boolean {
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['/panel']);
      return false;
    }else {
      let rol = this.auth.getCurrentRol();
      if (rol == 'ADMIN' || rol == 'EDITOR') return true
      else {
        this.router.navigate(['/panel']);
        return false
      }
    }
  }
  
}
