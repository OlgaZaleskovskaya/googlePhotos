import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
    name: 'filter',
    pure: true
})
export class FilterPipe implements PipeTransform {
  transform(items: Object[], start: number, end?: number): Object[] {     
    return items.filter((item, index) => index >= start && index < end );
  }
}