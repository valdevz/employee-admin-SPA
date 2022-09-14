import { Component, OnInit } from '@angular/core';
import { ProfileViewService } from 'src/app/services/auth/profile-view.service';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SearchService } from 'src/app/services/shared/search.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  arrowDown = faChevronDown;
  constructor( private searchService: SearchService, 
              private jwt: JwtHelperService,
              private profileService: ProfileViewService,
              private router: Router ) {}
  ngOnInit(): void {
    this.getUseName()
  }

  async goToProfile(){
    // this.profileView.changeProfile()
    this.searchService.searchById( this.userName ).subscribe({
      next: res => {
        this.profileService.changeProfile( res.user )
      },
      error: error => {

      }
    })
  }

  getUseName(){
    let token = sessionStorage.getItem('token')
    if( token ){
      this.userName = this.jwt.decodeToken( token ).userId;
    }
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
