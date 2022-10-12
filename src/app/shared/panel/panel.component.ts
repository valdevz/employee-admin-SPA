import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileViewService } from 'src/app/services/auth/profile-view.service';
import { UsersService } from '../../services/shared/users.service'
import { UserInterface } from './../../interface/user'
import { SearchService } from 'src/app/services/shared/search.service';
import { faArrowRight, faArrowLeft, faA, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from 'src/app/services/shared/loader.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  @ViewChild('name') nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('rol') rolInput: ElementRef<HTMLInputElement>;
  @ViewChild('dateOfBirth') dateOfBirthInput: ElementRef<HTMLInputElement>;
  @ViewChild('lastnames') lastnameInput: ElementRef<HTMLInputElement>;
  @ViewChild('email') Emailnput: ElementRef<HTMLInputElement>;
  @ViewChild('phone') phoneInput: ElementRef<HTMLInputElement>;
  // @ViewChild('addres') AddressInput: ElementRef<HTMLInputElement>;
  
  rightArrow: IconDefinition = faArrowRight;
  leftArrow: IconDefinition = faArrowLeft;
  prevPage: boolean = false;
  nextPage: boolean= true;
  sizePages: number = 0;
  isEditing: boolean = false;
  constructor( private profileView: ProfileViewService, 
               private usersService: UsersService,
               private searchService: SearchService,
               private loaderService: LoaderService, 
               private authService: AuthService,
               private _snackBar: MatSnackBar ) {
  } 
  p: number = 1;
  serviceSearchBar: string = 'google';
  page = 1;
  pageSize = 4;
  collectionSize: number = 0;
  user: UserInterface | null = null;
  allUsers:UserInterface | null = null;
  pagination: number = 0;
  currentRol: string = '';
  ngOnInit(): void {
    this.currentRol = this.authService.getCurrentRol()
    console.log(this.currentRol)
    this.profileView.userChanges$.subscribe( ( newUser: any ) => {
      console.log('se recibe en el oninit: ', newUser)
      this.user = newUser;
    });
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

  formValidator(): any {
    let email = this.Emailnput.nativeElement.value;
    let phone = this.phoneInput.nativeElement.value;
    let emptyField = '';
    if( this.currentRol == 'ADMIN'){
      let name = this.nameInput.nativeElement.value;
      let rol = this.rolInput.nativeElement.value;
      let lastname = this.lastnameInput.nativeElement.value;
      let dateOfBirth = this.dateOfBirthInput.nativeElement.value;

      if ( name == undefined || name == emptyField ) return { status: false, message: 'El campo Nombre debe ser tener un valor.'}
      if ( rol == undefined || rol == emptyField ) return { status: false, message: 'El campo Rol debe ser tener un valor.'}
      if ( lastname == undefined || lastname == emptyField ) return { status: false, message: 'El campo Apellidos debe ser tener un valor.'}
      if ( dateOfBirth == undefined || dateOfBirth == emptyField ) return { status: false, message: 'El campo Fecha de nacimiento debe ser tener un valor.'}
      if ( email == undefined || email == emptyField ) return { status: false, message: 'El campo Email debe ser tener un valor.'}
      if ( phone == undefined || phone == emptyField ) return { status: false, message: 'El campo Teléfono debe ser tener un valor.'}
      return { status: true, dataToUpdate: { userId: this.user?.userId, uName: name, rol, lastname, dateOfBirth, emailId: email, phoneNo: phone } };
    } else if ( this.currentRol == 'EDITOR' ){
      if ( email == undefined || email == emptyField ) return { status: false, message: 'El campo Email debe ser tener un valor.'}
      if ( phone == undefined || phone == emptyField ) return { status: false, message: 'El campo Teléfono debe ser tener un valor.'}
      return { status: true, dataToUpdate: { userId: this.user?.userId, emailId: email, phoneNo: phone } };
    }
    return { status: false };
  }

  editUser( action: string ){
    if (action == 'save'){
      let formVal = this.formValidator();
      if( formVal.status ){
        console.log('se manda: ', formVal.dataToUpdate)
        this.usersService.editUser( formVal.dataToUpdate ).subscribe({
          next: res => {
            if(res != undefined && this.user != undefined && this.user.userId != undefined){
              this.selectUser(this.user.userId);
              console.log('el id es: ', this.user.userId)
            }
          },
          error: err => {
            console.log(err)
          }
        })
      }else {
        this._snackBar.open( formVal.message )
        return 
      }
    }
    this.isEditing = !this.isEditing;
  }

  async nextPageFunc(){
    let loaded = await this.showHomeDashboard((this.page*10), 10)
    this.page += 1;
    if(this.page > 0) this.prevPage = true;
    if(this.page == this.sizePages) this.nextPage = false;
  }
  async prevPageFunc(){
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
    this.loaderService.loaderStatus( true )
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
          return resolve( this.allUsers )
        },
        error: err => {
          console.log(err)
          reject( err )
        },
      })

    })
    
    this.loaderService.loaderStatus( false )
    return loaded
  }

  selectUser( userId: string ){
    this.loaderService.loaderStatus( true )
    this.searchService.searchById( userId ).subscribe({
      next: user => {
        if( user.user != null){
          console.log('se recibe de usuario:', user.user)
          this.profileView.changeProfile( user.user )
          this.loaderService.loaderStatus( false )
        }
      },
      error: err => {
        console.log(err)
      }
    })
  }

}
