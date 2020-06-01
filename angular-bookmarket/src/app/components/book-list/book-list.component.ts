import { Component, OnInit } from '@angular/core';
import { Book } from '../../common/book';
import { BookService } from 'src/app/service/book.service';
import { ActivatedRoute } from '@angular/router/';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from 'src/app/common/cart-item';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  checkTheKeyword: boolean = false;

  //new properties for pagination
  currentPage: number = 1;
  totalRecords: number = 0;
  pageSize: number = 3;
  previouCategoryId = 1;
  constructor(private _bookService: BookService,
    private _spinnerService: NgxSpinnerService,
    private _cartService: CartServiceService,
    private _activatedRoute: ActivatedRoute,
    _config: NgbPaginationConfig) {
    _config.maxSize = 3;
    _config.boundaryLinks = true;
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(() => {

      this.listBooks();
    })
  }

  listBooks() {
    this._spinnerService.show();
    this.checkTheKeyword = this._activatedRoute.snapshot.paramMap.has("keyword");
    if (this.checkTheKeyword) {
      this.handleSearchBooks();
    }
    else {
      this.handleListBooks();
    }
  }

  handleListBooks() {
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 1;
    }
    //if previous and current category are not den we are setting current page to one
    if (this.previouCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previouCategoryId = this.currentCategoryId;
    this._bookService.getBooks(this.currentCategoryId,
      this.currentPage - 1,
      this.pageSize
    ).subscribe(this.processPaginate());
  }

  handleSearchBooks() {
    const searchBook: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._bookService.getSearchBooks(searchBook,this.currentPage - 1,
      this.pageSize).subscribe(
      this.processPaginate()
    );
  }
  processPaginate() {
    return data => {

      this._spinnerService.hide();
      this.books = data._embedded.books;
      this.totalRecords = data.page.totalElements;
      this.currentPage = data.page.number + 1;
      this.pageSize = data.page.size;

    }
  }
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }
  addToCart(book: Book) {
    console.log(`book Name :${book.name} and Price :${book.unitPrice}`);
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }
}

