import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  disable: boolean = false;
  logged:  boolean = false;
  title = 'empleadosAdmin';
  year: number = new Date().getFullYear();
  constructor(private authService: AuthService){
    this.authService.signInStatus$.subscribe({
      next: res => {
        if(typeof res == 'boolean') this.logged = res
      },
      error: err => {
        console.log(err)
        this.logged = false
      }
    })
  }
}
