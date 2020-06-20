import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CartItem } from 'src/app/common/cart-item';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { CheckoutService } from 'src/app/service/checkout.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  checkoutFormGroup:FormGroup;
  cartItems : CartItem []= [];
  totalPrice : number = 0;
  creditCardYears : number [] =[];
  creditCardMonths : number [] =[];
  constructor(private _formBuilder:FormBuilder,
    private _cartService:CartServiceService,private _checkoutService:CheckoutService) { }

  ngOnInit(): void {
    this.cartDetails();
    this.getCardMonthAndYear();
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
        }),
        creditCard : this._formBuilder.group({
          cardType : [''],
          nameOnCard : [''],
          cardNumber : [''],
          cvv : [''],
          expirationMonth : [''],
          expirationYear : ['']
        })
    })

  }
   onSubmit()
   {
     console.log("Purchase Books");
     console.log(this.checkoutFormGroup.get('customer').value);
   }
   copyShippingToBillingAddress(event)
   {
          if(event.target.checked)
          {
             this.checkoutFormGroup.controls.billingAddress
             .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
          }
          else{
            this.checkoutFormGroup.controls.billingAddress.reset();
          }
   }
   cartDetails()
   {
       this.cartItems=this._cartService.cartItems;
       this._cartService.totalPrice.subscribe(
         data => this.totalPrice=data
       )
       this._cartService.caculateTotalPrice();
   }
   getCardMonthAndYear()
   {
       
       const  currentMonth: number =new Date().getMonth()+1;
      
       this._checkoutService.getCreditCardMonths(currentMonth).subscribe(
         data => this.creditCardMonths =  data
       )
       this._checkoutService.getCreditCardYears().subscribe(
          data => this.creditCardYears = data
       )
   }
   getCardMonthOnChangeEvent(event)
   {
       let currentMonth :number = new Date().getMonth()+1;
       let currentYear=new Date().getFullYear();
       let year = event.target.value;
       if(year !=currentYear)
       {
        currentMonth=1;
       }
       this._checkoutService.getCreditCardMonths(currentMonth).subscribe(
        data => this.creditCardMonths =  data
      )
   }
}
