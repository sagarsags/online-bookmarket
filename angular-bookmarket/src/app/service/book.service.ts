import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {
   
  private baseUrl ="http://localhost:8080/api/v1/books";
  private categoryUrl ="http://localhost:8080/api/v1/book-category";

  constructor(private httpClient:HttpClient) { }

  getBooks(theCategoryId : number,currentPage:number,pageSize:number):Observable<GetResponseBooks>
  {

    const searchUrl=`${this.baseUrl}/search/categoryId?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
     return this.httpClient.get<GetResponseBooks>(searchUrl);
  }
  getSearchBooks(searchBookName: String):Observable<Book[]>
  {
     const searchBookUrl=`${this.baseUrl}/search/searchBook?name=${searchBookName}`;
     return this.httpClient.get<GetResponseBooks>(searchBookUrl).pipe(
              map(response => response._embedded.books)
     );
  }
  getBookDetails(bookId: number) : Observable<Book>
  {
    const bookDetail=`${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Book>(bookDetail);
  }
  getBooksByCategoies():Observable<BookCategory[]>
  {
    return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(

      map(response => response._embedded.bookcategory)
   );
  }

   
}

interface GetResponseBooks
{
    _embedded : {
      books:Book[];
    },
    page :{
      //number of records in each page
      size : number,
      //total number of records in the db
      totalElements : number,
      // total number of pages available
      totalPages : number,
      //currentPage
      number : number
    }
 }

 interface GetResponseBookCategory
{
    _embedded : {
      bookcategory:BookCategory[];
    }
 }
