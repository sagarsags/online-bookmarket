import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  cartItems: CartItem[]=[];
  totalPrice: Subject<number> =new Subject<number>();
  totalQuantity: Subject<number> =new Subject<number>();

  constructor() { }

  addToCart(thecartItem : CartItem)
  {
      let alreadyExistsInCart:boolean = false;
      let existsingCartItem : CartItem = undefined;
      if(this.cartItems.length > 0)
      {
        existsingCartItem=this.cartItems.find(tempCartItem => tempCartItem.id=== thecartItem.id);
        alreadyExistsInCart =(existsingCartItem !=undefined);
      }
      if(alreadyExistsInCart)
      {
        existsingCartItem.quantity++;
      }
      else{
          this.cartItems.push(thecartItem);
      }
      this.caculateTotalPrice();
  }
  caculateTotalPrice()
  {
      let totalPriceValue : number= 0;
      let totalQuantityValue : number = 0;
      for(let currentCartItem of this.cartItems)
      {
        totalPriceValue +=currentCartItem.quantity*currentCartItem.unitPrice;
        totalQuantityValue +=currentCartItem.quantity;
      }
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);
  }
  decrementQuantity(cartItem:CartItem)
  {
    cartItem.quantity--;
    if(cartItem.quantity === 0)
    {
       this.remove(cartItem);
    }
    else{
      this.caculateTotalPrice();
    }
    
  }
  
  remove(cartItem:CartItem)
  {
      const cartIndex=this.cartItems.findIndex((tempCartIndex)=> tempCartIndex.id === cartItem.id);
      if(cartIndex > -1)
      {
         this.cartItems.splice(cartIndex,1);
         this.caculateTotalPrice();
      }
  }
}
