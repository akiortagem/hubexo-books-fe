import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Book, BooksPage } from '../../domain/Book';
import { BooksApi } from '../../data/books-api';
import { debounceTime, distinctUntilChanged, finalize, map, skip } from 'rxjs';

@Component({
  selector: 'app-books-list-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './books-list-component.html',
  styleUrl: './books-list-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent implements AfterViewInit {
  private readonly api = inject(BooksApi);
  private readonly destroyRef = inject(DestroyRef);
  readonly isLoading = signal(false);
  readonly isLoadingMore = signal(false);
  readonly searchTerm = signal('');
  readonly pageSize = 10;
  readonly bookPage = signal<BooksPage | null>(null);
  readonly hasBooks = computed(() => (this.bookPage()?.items.length ?? 0) > 0);
  readonly hasMore = computed(() => {
    const page = this.bookPage();
    return !!page && page.page < page.totalPages;
  });
  readonly nextPage = computed(() => (this.bookPage()?.page ?? 0) + 1);
  readonly skeletonItems = Array.from({ length: 10 }, (_, index) => index);

  @ViewChild('sentinel', { static: true })
  private readonly sentinel?: ElementRef<HTMLDivElement>;

  constructor() {
    this.loadMore(1, this.pageSize);

    toObservable(this.searchTerm)
      .pipe(
        skip(1),
        map((term) => term.trim()),
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((term) => {
        if (term.length < 3) {
          if (term.length === 0) {
            this.bookPage.set(null);
            this.loadMore(1, this.pageSize);
          }
          return;
        }

        this.bookPage.set(null);
        this.loadMore(1, this.pageSize, term);
      });
  }

  ngAfterViewInit() {
    const target = this.sentinel?.nativeElement;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) {
        return;
      }

      const searchLength = this.searchTerm().trim().length;
      if (searchLength > 0 && searchLength < 3) {
        return;
      }

      if (!this.hasMore()) {
        return;
      }

      this.loadMore(this.nextPage(), this.pageSize);
    });

    observer.observe(target);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  onSearchInput(event: Event) {
    const target = event.target as HTMLInputElement | null;
    this.searchTerm.set(target?.value ?? '');
  }

  loadMore(page: number, pageSize: number, keywordString?: string) {
    const searchValue = (keywordString ?? this.searchTerm()).trim();
    if (searchValue.length > 0 && searchValue.length < 3) {
      return;
    }

    const isFirstPage = page === 1;
    if (isFirstPage ? this.isLoading() : this.isLoadingMore()) {
      return;
    }

    if (!isFirstPage && !this.hasMore()) {
      return;
    }

    if (isFirstPage) {
      this.isLoading.set(true);
    } else {
      this.isLoadingMore.set(true);
    }

    this.api
      .listBooks(page, pageSize, searchValue)
      .pipe(
        finalize(() => {
          if (isFirstPage) {
            this.isLoading.set(false);
          } else {
            this.isLoadingMore.set(false);
          }
        })
      )
      .subscribe((nextPage) => {
        this.bookPage.update((current) => {
          if (!current || isFirstPage) {
            return nextPage;
          }

          return {
            ...nextPage,
            items: [...current.items, ...nextPage.items],
          };
        });
      });
  }

  trackById(_: number, book: Book) {
    return book.id;
  }
}
