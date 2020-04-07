import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/common/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book:Book=new Book();
  constructor(private _activatedRoute:ActivatedRoute,private _bookservice:BookService) { }

  ngOnInit() {
    
  } 
  getBookinfo()
  {
    const id= +this._activatedRoute.snapshot.paramMap.get('id');
    this._bookservice.getBookDetails(id).subscribe(
      data=>this.book=data
    )
  }
}
