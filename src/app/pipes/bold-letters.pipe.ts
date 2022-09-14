import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boldLetters'
})
export class BoldLettersPipe implements PipeTransform {
  constructor() { }

  transform(textValue: string, subTextValue: string): string {     
    return textValue.replace(new RegExp(`(${subTextValue})`, 'gi'), '<b>$1</b>');
}
}