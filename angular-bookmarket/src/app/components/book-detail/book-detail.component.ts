import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { CartItem } from '../../common/cart-item';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book:Book=new Book();
  constructor(private _activatedRoute:ActivatedRoute,
    private _bookservice:BookService,
    private _cartService:CartServiceService) { }

  ngOnInit() {
     this._activatedRoute.paramMap.subscribe(
       ()=>{
          this.getBookinfo();
       }
     )
  } 
  getBookinfo()
  {
    const id= +this._activatedRoute.snapshot.paramMap.get('id');
    this._bookservice.getBookDetails(id).subscribe(
      data=>{
        this.book=data;
      }
    )
  }
  addToCart()
  {
      
      const cartItem=new CartItem(this.book);
      this._cartService.addToCart(cartItem);
  }
}
