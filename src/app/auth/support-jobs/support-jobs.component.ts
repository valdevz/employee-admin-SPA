import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupportJobsService } from 'src/app/services/auth/support-jobs.service';
import { LoaderService } from 'src/app/services/shared/loader.service';
import { SweetAlertMessageService } from 'src/app/services/shared/sweet-alert-message.service';

interface request {
  action?: string,
  id?: string,
  index?: number,
  name?: string
}

@Component({
  selector: 'app-support-jobs',
  templateUrl: './support-jobs.component.html',
  styleUrls: ['./support-jobs.component.scss']
})
export class SupportJobsComponent implements OnInit {

  jobs: Array<any> = [];
  title: string = 'Trabajos de apoyo';
  editedField: string | undefined ;

  constructor( private supportJobs: SupportJobsService,
    private loaderService: LoaderService,
    private router: Router,
    private sweetAlertSvc: SweetAlertMessageService ) {
      this.loaderService.loaderStatus( true )
      this.supportJobs.getAlljobs().subscribe({
        next: res => {
          this.jobs = res;
          this.loaderService.loaderStatus( false )
        },
        error: err => {
          this.loaderService.loaderStatus( false )
          console.log( err )
        }
      })
     }

  ngOnInit(): void {
  }

  deleteJob( payload: object ): Promise<any> {
    return new Promise( ( resolve, reject ) => {
      this.supportJobs.deleteJob( payload ).subscribe({
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

  editJob( obj: request ): Promise<any> {
    return new Promise( ( resolve, reject ) => {
      const payload = { id: obj.id, name: obj.name }
      this.supportJobs.editJob( payload ).subscribe({
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

  createJob( payload: request): Promise<any> {
    return new Promise( ( resolve, reject ) => {
      this.supportJobs.createJob( payload ).subscribe({
        next: res => {
          if(res.code == 201 || res.code == 200){
            return resolve( { status: true, message: 'Elemento creado correctamente.' } )
          }else {
            return resolve( { status: false, message: 'No se pudo crear el elemento.' } )
          }
        },
        error: err => {
          console.log(err)
          resolve( err )
        }
      })
    } );
  }

  async request( obj: request ) {
    let res ;
    if (obj.action ==  'delete' ){
      const payload = { id: obj.id }
      res = await this.deleteJob( payload )
    }else if( obj.action ==  'edit' ){
      res = await this.editJob( obj )
    } else if( obj.action ==  'create' ){
      res = await this.createJob( obj )
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

}
