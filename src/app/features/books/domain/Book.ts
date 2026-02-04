export type Book = {
  id: string;
  title: string;
  author: string;
  pubYear: string;
  isbn: string;
  genre: string;
  desc: string;
};

export type NewBook = {
  title: string;
  author: string;
  pubYear: string;
  isbn: string;
  genre: string;
  desc: string;
}

export type BooksPage = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  items: Book[];
};
