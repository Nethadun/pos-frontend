import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms';
import {ItemDto} from '../dto/item-dto';
import {ActivatedRoute} from '@angular/router';
import {ItemService} from '../service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  itemDto: ItemDto = new ItemDto();
  itemList: Array<ItemDto> = [];
  isEdit = false;
  submitted = false;
  public itemForm: NgForm;

  constructor(
    private Item: ItemService,
    private rout: ActivatedRoute,
  ) { this.getItem(); }

  ngOnInit() {
    this.rout.params.subscribe(param => {

      if (param && param.code) {
        console.log('param' + param.code);
        this.Item.getItemId(param.code).subscribe(
          (result) => {
            this.isEdit = true;
            this.itemDto = result;
          }
        );

      }
    });
  }

  onSubmit() {


    if (this.isEdit) {
      this.updateItem();
      this.itemForm.form.reset();
    } else {
      console.log('item save button');
      this.itemSave();
      console.log('item save button 2');
      // this.itemForm.form.reset();
    }
    this.submitted = false;

    return;
  }
  itemSave(): void {
    console.log('item save button 3');
    this.Item.itemSaves(this.itemDto).subscribe(result => {
      console.log('item save xxx');
      if (confirm('Are you Sure ?')) {
          this.getItem();
          if (result) {
            alert('Success');
            this.reset();
          }
        }

      }
    );
  }

  // getCusid(id) {
  //   this.Customer.getCusid(id).subscribe(result => {
  //     if (result) {
  //       this.customerList = result;
  //     }
  //
  //   });
  // }


  getItem() {
    this.Item.getItems('', 0, 0).subscribe(result => {
      if (result) {
        this.itemList = result;
      }

    });
  }

  deleteItem(code: number) {

    if (confirm('Are you sure ?')) {
      this.Item.deleteItems(code)
        .subscribe(result => {
          if (result) {
            this.getItem();
          } else {
          }
        });
    }
  }

  updateItem(): void {
    // this.designerDto.id = this.id;
    this.Item.updateItems(this.itemDto)
      .subscribe(result => {
          if (result) {
            // this.toastr.successToastr('Customer has been Updated successfully', 'Success!', {
            //   toastTimeout: 2000,
            //   dismiss: ('click'),
            //   showCloseButton: (true)
            //   }
            // );

            this.getItem();
            this.itemDto.description = '';
            this.itemDto.availableQty = 0;
            this.itemDto.unitePrice = 0;
            // }
          } else {

            // this.toastr.errorToastr('Customer  Update faild.', 'Faild!', {
            //   toastTimeout: 2000,
            //   dismiss: ('click'),
            //   showCloseButton: (true)

          }
        }
      );

  }

  reset(): void {
    this.itemDto.description = '';
    this.itemDto.availableQty = 0;
    this.itemDto.unitePrice = 0;
  }
}
