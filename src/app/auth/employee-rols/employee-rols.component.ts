import { Component, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EmployeeRolsService } from 'src/app/services/auth/employee-rols.service';
import { LoaderService } from 'src/app/services/shared/loader.service';
import { SweetAlertMessageService } from 'src/app/services/shared/sweet-alert-message.service';

interface request {
  action?: string,
  id?: string,
  index?: number,
  name?: string
}

@Component({
  selector: 'app-employee-rols',
  templateUrl: './employee-rols.component.html',
  styleUrls: ['./employee-rols.component.scss']
})
export class EmployeeRolsComponent implements OnInit {
  employeeRols: Array<any> = [];
  title: string = 'Roles de empleados';
  editedField: string | undefined ;

  constructor( private employeeRolService: EmployeeRolsService,
    private loaderService: LoaderService,
    private router: Router,
    private sweetAlertSvc: SweetAlertMessageService ) {
      this.loaderService.loaderStatus( true );
      this.employeeRolService.getAllRols().subscribe({
        next: res => {
          this.employeeRols = res;
          this.loaderService.loaderStatus( false )
        },
        error: err => {
          console.log(err)
        }
      })
               }

  ngOnInit(): void {
  }

  async request( obj: request ){
    let res ;
    if (obj.action ==  'delete' ){
      const payload = { id: obj.id }
      res = await this.deleteRol( payload )
    }else if( obj.action ==  'edit' ){
      res = await this.editRol( obj )
    } else if( obj.action ==  'create' ){
      res = await this.createRol( obj )
    }
    if( res.status == true ){
      this.sweetAlertSvc.toast('success', res.message)
      this.reloadComponent()
    } else{
      this.sweetAlertSvc.toast('error', res.message)
    }
  }

  deleteRol( payload: object ): Promise<any> {
    return new Promise( ( resolve, reject ) => {
      this.employeeRolService.deleteRol( payload ).subscribe({
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

  editRol( obj: request ): Promise<any> {
    return new Promise( ( resolve, reject ) => {
      const payload = { id: obj.id, name: obj.name }
      this.employeeRolService.editRol( payload ).subscribe({
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

  createRol( payload: request): Promise<any> {
    return new Promise( ( resolve, reject ) => {
      this.employeeRolService.createRol( payload ).subscribe({
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

  reloadComponent() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate([currentRoute])); 
  }

}
