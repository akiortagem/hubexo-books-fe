import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BooksPage, NewBook } from '../domain/Book';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksApi {
  constructor(private http: HttpClient){}

  listBooks(page: number, pageSize:number, keywordString?: string | null | undefined): Observable<BooksPage> {
    return this.http.get<BooksPage>(
      `${environment.apiUrl}/api/books`,
      {
        params: {
          page: page.toString(),
          pageSize: pageSize.toString(),
          keywordString: keywordString ?? ''
        }
      }
    )
  }

  getBook(uuid: string): Observable<Book>{
    return this.http.get<Book>(`${environment.apiUrl}/api/books/${uuid}`)
  }

  createBook(book: NewBook): Observable<Book>{
    return this.http.post<Book>(`${environment.apiUrl}/api/books`, book)
  }
}
