import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileViewService } from 'src/app/services/auth/profile-view.service';
import { UsersService } from '../../services/shared/users.service'
import { UserInterface } from './../../interface/user'
import { SearchService } from 'src/app/services/shared/search.service';
import { faArrowRight, faArrowLeft, faA, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  disable: boolean = false;
  rightArrow: IconDefinition = faArrowRight;
  leftArrow: IconDefinition = faArrowLeft;
  prevPage: boolean = false;
  nextPage: boolean= true;
  sizePages: number = 0;
  constructor( private profileView: ProfileViewService, 
               private usersService: UsersService,
               private searchService: SearchService ) {
  } 
  p: number = 1;
  serviceSearchBar: string = 'google';
  page = 1;
  pageSize = 4;
  collectionSize: number = 0;
  user: UserInterface | null = null;
  allUsers:UserInterface | null = null;
  pagination: number = 0;
  ngOnInit(): void {
    this.profileView.userChanges$.subscribe( ( newUser: any ) => {
      this.user = newUser;
      console.log('hay usuario asignado? ', this.isUserAsigned())
    });
    console.log('gggg')
    console.log(this.isUserAsigned())
    if( !this.isUserAsigned() ){
      let usr = sessionStorage.getItem( 'user' );
      if ( usr != null ) {
        this.user = JSON.parse( usr );
      }
    }else {
      let usr = sessionStorage.getItem( 'user' );
      if ( usr != null ) {
        this.user = JSON.parse( usr );
      }
    }
    if( this.user == null ) this.showHomeDashboard(0, 10)
  }

  async nextPageFunc(){
    this.disable = true;
    let loaded = await this.showHomeDashboard((this.page*10), 10)
    this.page += 1;
    if(this.page > 0) this.prevPage = true;
    if(this.page == this.sizePages) this.nextPage = false;
  }
  async prevPageFunc(){
    this.disable = true;
    this.page -= 1;
    let loaded = await this.showHomeDashboard( ( ( this.page - 1 ) * 10 ), 10 )
    if(this.page == 1) this.prevPage = false;
    if(this.page > 1) this.prevPage = true;
    if(this.page < this.sizePages) this.nextPage = true;
  }

  isUserAsigned(): boolean {
    if( this.user != null){
      if(Object.entries( this.user ).length == 0 ) return false
      else return true
    }
    else return true
  }
  async showHomeDashboard(skip: number, limit: number): Promise<any>{
    let loaded = await new Promise( ( resolve, reject ) => {
      this.usersService.getAllUsers( skip, limit ).subscribe({
        next: res => {
          res.map( ( item: any, i: number ) => {
            if( item.counter != undefined ) {
              this.collectionSize = item.counter;
              delete res[i]
            }
          })
          this.sizePages = Math.floor(this.collectionSize/10)
          this.allUsers = res;
          this.disable = false;
          return resolve( this.allUsers )
        },
        error: err => {
          console.log(err)
          reject( err )
        },
      })

    })
    
    
    console.log(loaded)
    return loaded
  }

  selectUser(userId: string){
    this.disable = true;
    this.searchService.searchById( userId ).subscribe({
      next: user => {
        if( user.user != null){
          this.profileView.changeProfile( user.user )
          this.disable = false;
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
