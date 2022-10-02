import { Component, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SuburbsService } from 'src/app/services/auth/suburbs.service';
import { LoaderService } from 'src/app/services/shared/loader.service';
import { SweetAlertMessageService } from 'src/app/services/shared/sweet-alert-message.service';

interface request {
  action?: string,
  id?: string,
  index?: number,
  name?: string
}

@Component({
  selector: 'app-suburbs',
  templateUrl: './suburbs.component.html',
  styleUrls: ['./suburbs.component.scss']
})
export class SuburbsComponent implements OnInit {
  suburbs: Array<any> = [];
  title: string = 'Colonias';
  editedField: string | undefined ;

  constructor( private suburbsService: SuburbsService,
               private loaderService: LoaderService,
               private router: Router,
               private sweetAlertSvc: SweetAlertMessageService ) {
    
    this.loaderService.loaderStatus( true )
    this.suburbsService.getAllSuburbs().subscribe({
      next: res => {
        this.suburbs = res;
        this.loaderService.loaderStatus( false )
      },
      error: err => {
        console.log(err)
      }
    })
  }

  deleteSububr( payload: object ): Promise<any> {
    return new Promise( ( resolve, reject ) => {
      this.suburbsService.deleteSuburb( payload ).subscribe({
        next: res => {
          if(res.code == 200){
            return resolve( { status: true, message: 'Elemento eliminado correctamente' } )
          }else {
            return resolve( { status: false, message: 'No se pudo eliminar' } )
          }
        },
        error: err => {
          resolve( err )
        }
      })
    })
  }

  editSuburb( obj: request ): Promise<any> {
    return new Promise( ( resolve, reject ) => {
      const payload = { id: obj.id, name: obj.name }
      this.suburbsService.editSuburb( payload ).subscribe({
        next: res => {
          if(res.code == 200){
            return resolve( { status: true, message: 'Elemento editado correctamente' } )
          }else {
            return resolve( { status: false, message: 'No se pudo editar' } )
          }
        },
        error: err => {
          console.log(err)
          resolve( err )
        }
      })
    })
  }

  createSuburb( payload: request): Promise<any> {
    return new Promise( ( resolve, reject ) => {
      this.suburbsService.createSuburb( payload ).subscribe({
        next: res => {
          if(res.code == 201 || res.code == 200){
            return resolve( { status: true, message: 'Elemento creado correctamente.' } )
          }else {
            return resolve( { status: false, message: 'No se pudo crear el elemento.' } )
          }
        },
        error: err => {
          console.log(err)
          reject( err )
        }
      })
    } );
  }

  async request( obj: request ){
    let res ;
    if (obj.action ==  'delete' ){
      const payload = { id: obj.id }
      res = await this.deleteSububr( payload )
    }else if( obj.action ==  'edit' ){
      res = await this.editSuburb( obj )
    } else if( obj.action ==  'create' ){
      res = await this.createSuburb( obj )
    }
    if( res.status == true ){
      this.sweetAlertSvc.toast('success', res.message)
      this.reloadComponent()
    } else{
      this.sweetAlertSvc.toast('error', res.message)
    }
  }

  reloadComponent() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate([currentRoute])); 
  }

  ngOnInit(): void {
  }

}
