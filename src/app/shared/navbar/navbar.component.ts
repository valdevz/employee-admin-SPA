import { Component, OnInit } from '@angular/core';
import { ProfileViewService } from 'src/app/services/auth/profile-view.service';
import { faChevronDown, faBars, faXmark,  IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SearchService } from 'src/app/services/shared/search.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  arrowDown: IconDefinition = faChevronDown;
  barMenu: IconDefinition = faBars;
  faXmark : IconDefinition = faXmark;
  showSidebar: boolean = false;
  constructor( private searchService: SearchService, 
              private jwt: JwtHelperService,
              private profileService: ProfileViewService,
              private router: Router,
              private auth: AuthService ) {}
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

  goHomeDashboard(){
    this.profileService.cleanProfileView()
    this.router.navigate(['/'])
  }

  getUseName(){
    let token = sessionStorage.getItem('token')
    if( token ){
      this.userName = this.jwt.decodeToken( token ).userId;
    }
  }
  toogleSidebar(){
    this.showSidebar = !this.showSidebar;
  }

  logOut() {
    sessionStorage.clear();
    this.auth.isAuthenticated()
    this.router.navigate(['']);
  }
}
