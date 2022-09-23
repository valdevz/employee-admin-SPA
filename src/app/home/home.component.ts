import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoaderService } from '../services/shared/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  disable: boolean = false;
  user: string | undefined;
  pass: string | undefined;

  constructor( 
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private loaderService: LoaderService,
    private router: Router,
    private jwt: JwtHelperService ) {
      let tokn = sessionStorage.getItem( 'token' )
      if( tokn && !jwt.isTokenExpired( tokn ) ) router.navigate( ['/panel'] )
  }

  login() {
    const user = { user: this.user, pass: this.pass };
    this.disable = true;
    this.loaderService.loaderStatus( true );
    this.authService.login( user ).subscribe({ 
      next: res => {
        console.log('termina la carga')
        this.loaderService.loaderStatus( false );
        sessionStorage.setItem( 'token', res.token )
        this.router.navigate( ['panel'] );
      },
      error: err => {
        this._snackBar.open(err.error)
        this.disable = false;
        setTimeout( () => this._snackBar.dismiss(), 4000 )
      },
      complete: () => {
        console.log( 'complete' )
      }
  });
  }

  ngOnInit(): void {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
  }

}
