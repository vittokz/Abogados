import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pruebas'
})
export class PruebasPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
