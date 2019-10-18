import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderDetailsDto} from '../dto/order-details-dto';
import {CustomerDto} from '../dto/customerDto';
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
export class OrderService {

  constructor(private http: HttpClient) {
  }

  addOrder(order: OrderDetailsDto) {
    return this.http.post<Array<any>>('http://localhost:8810/api/comtech/test/item' , order , httpOptions);
  }
  // getCustomer(text: string, count: number, page: number) {
  //   return this.http.get<Array<any>>('http://localhost:8810/api/comtech/test/customer' + '?text=' + text + '&count=' + count + '&page=' + page, httpOptions);
  // }
  // getCusid(cid) {
  //   console.log('serivce' + cid);
  //   return this.http.get<CustomerDto>('http://localhost:8810/api/comtech/test/customer/' + cid, httpOptions);
  // }
  // getItems(text: string, count: number, page: number) {
  //   return this.http.get<Array<any>>('http://localhost:8810/api/comtech/test/item' + '?text=' + text + '&count=' + count + '&page=' + page, httpOptions);
  // }
  //
  // getItemId(code) {
  //   console.log('serivce' + code);
  //   return this.http.get<ItemDto>('http://localhost:8810/api/comtech/test/item/' + code, httpOptions);
  // }


}
