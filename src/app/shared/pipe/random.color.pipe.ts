import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomColor'
})
export class RandomColorPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return {'background-color': randomColor};
  }
}