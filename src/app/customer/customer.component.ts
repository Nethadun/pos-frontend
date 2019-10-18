import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerDto} from '../dto/customerDto';
import {CustomerService} from '../service/customer.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerdto: CustomerDto = new CustomerDto();
  customerList: Array<CustomerDto> = [];
  isEdit = false;
  submitted = false;
  public usersForm: NgForm;

  constructor(
    private Customer: CustomerService,
    private rout: ActivatedRoute,
  ) {
    this.getCustomer();
  }

  ngOnInit() {

    this.rout.params.subscribe(param => {

      if (param && param.cid) {
        console.log('param' + param.cid);
        this.Customer.getCusid(param.cid).subscribe(
          (result) => {
            this.isEdit = true;
            this.customerdto = result;
                     }
        );

      }
    });
  }

  onSubmit() {


    if (this.isEdit) {
      this.updateCustomer();
      this.usersForm.form.reset();
    } else {
      this.customerSave();
      // this.usersForm.form.reset();
    }
    this.submitted = false;

    return;
  }

  customerSave(): void {
    this.Customer.customerSave(this.customerdto).subscribe(result => {
        if (confirm('Are you Sure ?')) {
          this.getCustomer();
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


  getCustomer() {
    this.Customer.getCustomer('', 0, 0).subscribe(result => {
      if (result) {
        this.customerList = result;
      }

    });
  }

  deleteCustomer(cid: number) {

    if (confirm('Are you sure ?')) {
      this.Customer.deleteCustomer(cid)
        .subscribe(result => {
          if (result) {
            this.getCustomer();
          } else {
          }
        });
    }
  }

  updateCustomer(): void {
    // this.designerDto.id = this.id;
    this.Customer.updateCustomer(this.customerdto)
      .subscribe(result => {
          if (result) {
            // this.toastr.successToastr('Customer has been Updated successfully', 'Success!', {
            //   toastTimeout: 2000,
            //   dismiss: ('click'),
            //   showCloseButton: (true)
            //   }
            // );

            this.getCustomer();
            this.customerdto.customerName = '';
            this.customerdto.address = '';
            this.customerdto.telephone = '';
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
    this.customerdto.customerName = '';
    this.customerdto.address = '';
    this.customerdto.telephone = '';
  }
}
