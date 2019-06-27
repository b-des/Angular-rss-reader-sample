import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})


export class UniquePipe implements PipeTransform {

  transform(value: any, args?: any): any {

      return value.map(item => item[args]).filter((value, index, self) => self.indexOf(value) === index).length;

  }

}
