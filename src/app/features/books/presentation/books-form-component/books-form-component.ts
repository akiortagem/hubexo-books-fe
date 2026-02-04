import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, filter, map, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { BooksApi } from '../../data/books-api';
import { Book } from '../../domain/Book';

@Component({
  selector: 'app-books-form-component',
  imports: [CommonModule],
  templateUrl: './books-form-component.html',
  styleUrl: './books-form-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksFormComponent {
  private readonly api = inject(BooksApi);
  private readonly route = inject(ActivatedRoute);

  readonly isLoading = signal(true);
  readonly book = toSignal<Book | null>(
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      tap((id) => {
        if (!id) {
          this.isLoading.set(false);
        }
      }),
      filter((id): id is string => Boolean(id)),
      tap(() => this.isLoading.set(true)),
      switchMap((id) =>
        this.api.getBook(id).pipe(finalize(() => this.isLoading.set(false)))
      )
    ),
    { initialValue: null }
  );
}
