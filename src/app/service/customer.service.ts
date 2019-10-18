import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {CustomerDto} from '../dto/customerDto';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('systemadmin:1234')
  })
};


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private  http: HttpClient) {
  }

  customerSave(customer: CustomerDto) {
    return this.http.post<Array<any>>('http://localhost:8810/api/comtech/test/customer', customer, httpOptions);
  }

  getCustomer(text: string, count: number, page: number) {
    return this.http.get<Array<any>>('http://localhost:8810/api/comtech/test/customer' + '?text=' + text + '&count=' + count + '&page=' + page, httpOptions);
  }

  deleteCustomer(cid: number) {
    return this.http.delete<Array<number>>('http://localhost:8810/api/comtech/test/customer/' + cid, httpOptions);
  }

  updateCustomer(customer: CustomerDto) {
    return this.http.put<Array<any>>('http://localhost:8810/api/comtech/test/customer', customer, httpOptions);
  }

  getCusid(cid) {
    console.log('serivce' + cid);
    return this.http.get<CustomerDto>('http://localhost:8810/api/comtech/test/customer/' + cid, httpOptions);
  }
}

