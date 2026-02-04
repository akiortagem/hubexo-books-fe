import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BooksPage } from '../domain/Book';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksApi {
  constructor(private http: HttpClient){}

  listBooks(page: number, pageSize:number): Observable<BooksPage> {
    return this.http.get<BooksPage>(
      `${environment.apiUrl}/api/books`,
      {
        params: {
          page: page.toString(),
          pageSize: pageSize.toString()
        }
      }
    )
  }

  getBook(uuid: string): Observable<Book>{
    return this.http.get<Book>(`${environment.apiUrl}/api/books/${uuid}`)
  }
}
