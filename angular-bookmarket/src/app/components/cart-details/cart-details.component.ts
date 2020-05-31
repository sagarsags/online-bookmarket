import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartServiceService } from '../../service/cart-service.service';
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;
  cartItems: CartItem[] = [];
  constructor(private _cartService: CartServiceService) { }

  ngOnInit(): void {
    this.cartDetails();
  }
  cartDetails() {
    this.cartItems = this._cartService.cartItems;
    this._cartService.totalPrice.subscribe(

      data => this.totalPrice = data
    );
    this._cartService.totalQuantity.subscribe(

      data => this.totalQuantity = data
    );
    this._cartService.caculateTotalPrice();
  }

}
