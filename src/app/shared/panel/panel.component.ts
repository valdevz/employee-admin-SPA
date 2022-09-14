import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileViewService } from 'src/app/services/auth/profile-view.service';
import { UserInterface } from './../../interface/user'

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  disable: boolean = false;
  constructor( private profileView: ProfileViewService ) {
  }
  user = {} as UserInterface;
  ngOnInit(): void {
    this.profileView.userChanges$.subscribe( ( newUser: any ) => {
      this.user = newUser;
      console.log('hay usuario asignado? ', this.isUserAsigned())
    });
    if( !this.isUserAsigned() ){
      let usr = sessionStorage.getItem( 'user' );
      if ( usr != null ) this.user = JSON.parse( usr );
    }
    // if( this.user ){}
  }
  isUserAsigned(): boolean {
    if(Object.entries( this.user ).length == 0 ) return false
    else return true
  }
}
