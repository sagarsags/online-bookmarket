import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Book } from '../../common/book';
import { Router } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  constructor(private _router:Router) { }

  ngOnInit() {
  }
  searchBooks(searchBookName:String)
  {
    
    this._router.navigateByUrl('/search/'+searchBookName);
  
  }

}
