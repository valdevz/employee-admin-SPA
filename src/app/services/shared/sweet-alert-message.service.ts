import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertMessageService {

  constructor() { }

  toast(type: SweetAlertIcon, title: string, text?: string) {
    const toast = Swal.mixin({
        toast: true,
        icon: type,
        position: 'top-end',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 6000,
        text: text,
        customClass: 'info-modal'
    });
    toast.fire(title, text, type);
  }

  async confirm( title: string, text?: string, html?: string): Promise<SweetAlertResult> {
    const result: SweetAlertResult = await Swal.fire({
        title: `${title}`,
        text: text,
        icon: 'question',
        html:html,
        showCancelButton: true,
        confirmButtonColor: '#009688',
        cancelButtonColor: '#688696',
        confirmButtonText: 'Yes',
        allowOutsideClick: true,
        customClass: 'question-modal'
    });
    return result;
  }

  async input( ): Promise<SweetAlertResult> {
    const result: SweetAlertResult = await Swal.fire({
      input: 'text',
      inputLabel: 'Añadir nuevo elemento',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true,
      inputValidator: ( input ) => {
        return new Promise( ( resolve ) => input.trim().length < 1 ? resolve('Debes insertar un valor.') : resolve(''))
      }
    })
    return result;
  }

  alert(type: SweetAlertIcon, title: string, text?: string) {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      confirmButtonColor: '#28bebd',
      customClass: 'uk-animation-slide-top-small'
    });
}

}
