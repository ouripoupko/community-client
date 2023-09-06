import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'middleEllipsis'
})
export class MiddleEllipsisPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value.length > 30) {
      return value.slice(0, 4) + '...' + value.slice(-4);
    }
    return value;
  }

}
