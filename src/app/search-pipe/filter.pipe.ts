import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'tableFilter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchText: string, prop?: any): any {
    if (!value) {
      return [];
    }
    if (!searchText || !prop) {
      return value;
    }
    const _searchText = searchText.toLowerCase(),
      _isArr = Array.isArray(value),
      _flag = _isArr && typeof value[0] === 'object' ? true : _isArr && typeof value[0] !== 'object' ? false : true;

    return value.filter(ele => {
      const val = _flag ? ele[prop] : ele;
      return val.toString().toLowerCase().includes(_searchText);
    });

  }

}
