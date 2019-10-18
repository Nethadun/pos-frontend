import {Component, OnInit} from '@angular/core';
import {CustomerDto} from '../dto/customerDto';
import {CustomerService} from '../service/customer.service';
import {NgForm} from '@angular/forms';
import {ItemDto} from '../dto/item-dto';
import {ItemService} from '../service/item.service';
import {ActivatedRoute} from '@angular/router';
import {Orders} from './order-form';
import {OrderDetailsDto} from '../dto/order-details-dto';
import {OrderService} from '../service/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  customerdto: CustomerDto = new CustomerDto();
  customerList: Array<CustomerDto> = [];
  itemDto: ItemDto = new ItemDto();
  itemList: Array<ItemDto> = [];
  public usersForm: NgForm;
  public itemForms: NgForm;
  public orderForms: NgForm;
  searchText: string;
  searchTextCust: string;
  total = 0;
  discount = 0;
  bal = 0;
  order: Orders[] = [];
  ordersdetail: OrderDetailsDto = new OrderDetailsDto();
  tot: number;
  private discount1: number;

  constructor(
    private Customer: CustomerService,
    private Item: ItemService,
    private rout: ActivatedRoute,
    private orders: OrderService,
  ) {

    this.getCustomer();
    this.getItem();
    this.netAmount(this.discount1);
    // this.loadItems();
  }

  ngOnInit() {
    this.rout.params.subscribe(param => {

      if (param && param.code) {
        console.log('param' + param.code);
        this.Item.getItemId(param.code).subscribe(
          (result) => {
            // this.isEdit = true;
            this.itemDto = result;
          }
        );

      }
    });
    this.rout.params.subscribe(param => {

      if (param && param.cid) {
        console.log('param' + param.cid);
        this.Customer.getCusid(param.cid).subscribe(
          (result) => {
            // this.isEdit = true;
            this.customerdto = result;
          }
        );
      }
    });
  }

  addCart(code: string, description: string, unitePrice: number, qty: number, discount1: number, paid: number): void {
    console.log('1');
    const orders = new Orders(code, description, unitePrice, qty, discount1, paid);
    console.log('1');
    this.total += unitePrice * qty;
    console.log(discount1);
    this.discount = ((100 - discount1) / 100) * this.total;
    console.log(this.discount);

    this.order.push(orders);
    this.reset();
    // this.addItemTotal(unitePrice, qty);
    // this.netAmount(discount1);
  }

  netAmount(discount1: number) {
    this.discount = ((100 - discount1) / 100) * this.total;
    // return this.discount;
  }

  balace(paid: number) {
    this.bal = (paid - this.discount);
  }

  getCustomer() {
    this.Customer.getCustomer('', 0, 0).subscribe(result => {
      if (result) {
        this.customerList = result;
      }

    });
  }

  getItem() {
    this.Item.getItems('', 0, 0).subscribe(result => {
      if (result) {
        this.itemList = result;
      }

    });
  }

  reset(): void {
    this.ordersdetail.qty = 0;
    // this.itemDto.code = '';
    // this.itemDto.description = '';
    // this.itemDto.availableQty = null;
    // this.itemDto.unitePrice = null;
  }

  orderSave(): void {
    console.log('item save button 3');
    this.orders.addOrder(this.ordersdetail).subscribe(result => {
        console.log('item save xxx');
        if (confirm('Are you Sure ?')) {
          if (result) {
            alert('Success');
          }
        }

      }
    );
  }

  // public addItemTotal(unitePrice: number, qty: number) {
  //   const tot = (unitePrice * qty);
  //
  //   return tot;
  //   // this.addTotal(tot);
  //
  // }

//   addTotal(unitePrice: number, qty: number) {
//     // const total = (unitePrice * qty);
//     const tott = 0;
//     const total = (unitePrice * qty);
//     for (let t) {
// const to = (total + total);
// }
//     return tott;
//     console.log(total);
//
//   }


// loadServices() {
//   this.serviceService.searchServices()
//     .subscribe(result => {
//       this.serviceList = result;
//       console.log("SERVICES:" + JSON.stringify(this.serviceList));
//     });
// }

// loadItems() {
//   this.Item.searchItem()
//     .subscribe(result => {
//       this.itemList = result;
//       console.log('item:' + JSON.stringify(this.itemList));
//     });
// }

}
