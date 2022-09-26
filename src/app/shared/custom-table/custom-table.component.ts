import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ɵBrowserAnimationBuilder } from '@angular/platform-browser/animations';
import { faPen, faCheck, faTrash, IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SweetAlertMessageService } from 'src/app/services/shared/sweet-alert-message.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {
  @Input( 'obj' ) obj: Array<any>;
  @Input( 'str' ) title: string;
  @Output() action = new EventEmitter<any>();
  delete: IconDefinition = faTrash;
  edit: IconDefinition = faPen;
  done: IconDefinition = faCheck;
  cancel: IconDefinition = faXmark
  editStatus: boolean = false;
  indexT: number | null = null;
  editedField: string = '';

  constructor( private sweetAlertSvc: SweetAlertMessageService, ) { }

  ngOnInit(): void {}

  editFunc( value: string, index: number ){
    this.editStatus = !this.editStatus;
    this.indexT = this.editStatus ? index : null;
  }

  launchModal(){
    this.sweetAlertSvc.input()
      .then(res => { 
        const action = 'create';
        if ( res.isConfirmed && res.value ){
          this.action.emit( {action, name: res.value} ); 
        }
      })
  }

  keyup( e: string ){
    this.editedField = e;
  }

  saveFunc( action: string, id: string, index: number){
    this.action.emit( { action, id, index, name: this.editedField } ); 
  }

  deleteFunc( action: string, id: string, index: number ){
    this.sweetAlertSvc.confirm(
      '¿Estas seguro que deseas eliminar este elemento?',
      'Esta acción no podrá revertirse.'
      )
    .then(res => {
      if( res.isConfirmed ){
        this.action.emit( {action, id, index} ); 
      }
    })
    
  }

}
