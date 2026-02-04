import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../features/books/presentation/books-list-component/books-list-component')
        .then((m) => m.BooksListComponent),
  },
  {
    path: 'books/new',
    loadComponent: () =>
      import('../features/books/presentation/books-form-component/books-form-component')
        .then((m) => m.BooksFormComponent),
  },
  {
    path: 'books/:id',
    loadComponent: () =>
      import('../features/books/presentation/books-form-component/books-form-component')
        .then((m) => m.BooksFormComponent),
  },
];
