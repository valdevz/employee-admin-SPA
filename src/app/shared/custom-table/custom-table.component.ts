import { Component, EventEmitter, Input, OnInit, Output, AfterContentChecked } from '@angular/core';
import { ɵBrowserAnimationBuilder } from '@angular/platform-browser/animations';
import { faPen, faCheck, faTrash, IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons';
import { SweetAlertMessageService } from 'src/app/services/shared/sweet-alert-message.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit, AfterContentChecked {
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
  showingResults: Array<any> = [];
  firstLoad: boolean = true;

  constructor( private sweetAlertSvc: SweetAlertMessageService, ) {}

  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    if(this.obj.length > 0 && this.firstLoad ){
      this.firstLoad = false;
      this.showingResults = this.obj;
    }
  }

  searchItem( name: string ){
    if (name.length > 0){
      let matchArr = []
      let regex = new RegExp(`(${name.normalize( "NFD" ).replace(/[\u0300-\u036f]/g, "")})`, 'gi')
      matchArr = this.obj.filter( item => {
        let noAccents = item.name.normalize( "NFD" ).replace(/[\u0300-\u036f]/g, "")
        if( regex.test(noAccents) ) return item.name;
      })
      this.showingResults = matchArr;
    } else {
      this.showingResults = this.obj;
    }
  }

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
