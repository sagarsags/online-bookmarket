import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './service/book.service';
import { Book } from './common/book';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { SearchComponent } from './components/search/search.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {path:'books',component:BookListComponent},
  {path:'checkout',component:CheckoutPageComponent},
  {path:'category/:id',component:BookListComponent},
  {path:'books/:id',component:BookDetailComponent},
  {path:'search/:keyword',component:BookListComponent},
  {path:'cart-details',component:CartDetailsComponent},
  {path:'', redirectTo:'/books',pathMatch:'full'},
  {path:'**', component:PageNotFoundComponent}
   
]
@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    SearchComponent,
    BookDetailComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
