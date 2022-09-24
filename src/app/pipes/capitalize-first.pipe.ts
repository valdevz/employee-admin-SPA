import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {

  transform(value: string): unknown {
    let first = value.substring(0,1).toUpperCase();
    return first + value.substring(1); 
  }

}
