import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Book, BooksPage } from '../../domain/Book';
import { BooksApi } from '../../data/books-api';
import { finalize } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-books-list-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './books-list-component.html',
  styleUrl: './books-list-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent {
  private readonly api = inject(BooksApi);
  readonly isLoading = signal(true);
  readonly bookPage = toSignal<BooksPage | null>(
    this.api.listBooks().pipe(finalize(() => this.isLoading.set(false))),
    { initialValue: null }
  );
  readonly hasBooks = computed(() => (this.bookPage()?.items.length ?? 0) > 0);
  readonly skeletonItems = Array.from({ length: 10 }, (_, index) => index);

  trackById(_: number, book: Book) {
    return book.id;
  }
}
