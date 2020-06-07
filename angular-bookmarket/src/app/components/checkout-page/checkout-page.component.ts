import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  checkoutFormGroup:FormGroup;
  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormGroup=this._formBuilder.group({
        customer : this._formBuilder.group({
          firstName : [''],
          lastName : [''],
          email : ['']
        }),
        shippingAddress : this._formBuilder.group({
          street : [''],
          city : [''],
          state : [''],
          country : [''],
          zipcode : ['']
        }),
        billingAddress : this._formBuilder.group({
          street : [''],
          city : [''],
          state : [''],
          country : [''],
          zipcode : ['']
        })
    })
  }
   onSubmit()
   {
     console.log("Purchase Books");
     console.log(this.checkoutFormGroup.get('customer').value);
   }
}
