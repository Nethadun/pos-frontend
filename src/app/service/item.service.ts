import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ItemDto} from '../dto/item-dto';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('systemadmin:1234')
  })
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private  http: HttpClient) {

  }

  itemSaves(item: ItemDto) {
    return this.http.post<Array<any>>('http://localhost:8810/api/comtech/test/item', item, httpOptions);
  }

  getItems(text: string, count: number, page: number) {
    return this.http.get<Array<any>>('http://localhost:8810/api/comtech/test/item' + '?text=' + text + '&count=' + count + '&page=' + page, httpOptions);
  }

  deleteItems(code: number) {
    return this.http.delete<Array<number>>('http://localhost:8810/api/comtech/test/item/' + code, httpOptions);
  }

  // deleteCustomer(cid: number): Observable {
  //   return this.http.delete('http://localhost:8810/api/comtech/test/customer' + cid, httpOptions);
  // }
  updateItems(item: ItemDto) {
    return this.http.put<Array<any>>('http://localhost:8810/api/comtech/test/item', item, httpOptions);
  }

  getItemId(code) {
    console.log('serivce' + code);
    return this.http.get<ItemDto>('http://localhost:8810/api/comtech/test/item/' + code, httpOptions);
  }

  searchItem(): Observable<Array<ItemDto>> {
    return this.http.get<Array<ItemDto>>('http://localhost:8810/api/comtech/test/item' , httpOptions);
  }

}
