import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileViewService } from 'src/app/services/auth/profile-view.service';
import { UsersService } from '../../services/shared/users.service'
import { UserInterface } from './../../interface/user'

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  disable: boolean = false;
  constructor( private profileView: ProfileViewService, 
               private usersService: UsersService ) {
  }
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  user: UserInterface | null = null;
  allUsers:UserInterface | null = null;
  pagination: number = 0;
  ngOnInit(): void {
    this.profileView.userChanges$.subscribe( ( newUser: any ) => {
      this.user = newUser;
      console.log('hay usuario asignado? ', this.isUserAsigned())
    });
    if( !this.isUserAsigned() ){
      let usr = sessionStorage.getItem( 'user' );
      if ( usr != null ) {
        this.user = JSON.parse( usr );
      }
      else {
        console.log('entra aquí')
      }
    }
    if( this.user == null ) this.showHomeDashboard()
    console.log('final ', this.user)
  }
  isUserAsigned(): boolean {
    if( this.user != null){
      if(Object.entries( this.user ).length == 0 ) return false
      else return true
    }
    else return true
  }
  showHomeDashboard(){
    console.log('funcion')
    this.usersService.getAllUsers(1, 10).subscribe({
      next: res => {
        this.allUsers = res;
        console.log('all users')
        console.log(this.allUsers)
      },
      error: err => {
        console.log(err)
      },
    })
  }
}
