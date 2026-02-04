import { Component } from '@angular/core';
import { Book } from '../../domain/Book';

@Component({
  selector: 'app-books-list-component',
  imports: [],
  templateUrl: './books-list-component.html',
  styleUrl: './books-list-component.css',
})
export class BooksListComponent {
  books: Book[] = [
    {
      id: 'b-001',
      title: 'The Quiet Lattice',
      author: 'Maya Ren',
      pubYear: '2018',
      isbn: '9780143127741',
      genre: 'Literary Fiction',
      desc: 'A cartographer returns home to reconcile the city she mapped with the family she left behind.',
    },
    {
      id: 'b-002',
      title: 'Signal in the Harbor',
      author: 'Jonas Hale',
      pubYear: '2021',
      isbn: '9780062968793',
      genre: 'Mystery',
      desc: 'A cold-case reporter uncovers a vanished lighthouse keeper and a town built on omissions.',
    },
    {
      id: 'b-003',
      title: 'Clockwork Orchard',
      author: 'Elena Voss',
      pubYear: '2016',
      isbn: '9780307277671',
      genre: 'Science Fiction',
      desc: 'A biomechanical orchard feeds a frontier colony until its caretakers learn what it is truly growing.',
    },
    {
      id: 'b-004',
      title: 'Glass Rivers',
      author: 'Priya Nandakumar',
      pubYear: '2019',
      isbn: '9780525533187',
      genre: 'Historical Fiction',
      desc: 'Two sisters in postwar Mumbai navigate a glass factory that mirrors their shifting loyalties.',
    },
    {
      id: 'b-005',
      title: 'The Last Field Test',
      author: 'Caleb Ortez',
      pubYear: '2023',
      isbn: '9781250257194',
      genre: 'Thriller',
      desc: 'A drone systems engineer races to stop a prototype from being deployed in a private war.',
    },
    {
      id: 'b-006',
      title: 'Salt & Paper',
      author: 'Nora Delgado',
      pubYear: '2017',
      isbn: '9780735219090',
      genre: 'Romance',
      desc: 'A pastry chef and a documentary filmmaker find common ground in a seaside town.',
    },
    {
      id: 'b-007',
      title: 'Thread of Ember',
      author: 'Hugo Serrano',
      pubYear: '2020',
      isbn: '9780765387466',
      genre: 'Fantasy',
      desc: 'A novice weaver discovers her tapestries can bind dragons and unravel kings.',
    },
    {
      id: 'b-008',
      title: 'The Second Atlas',
      author: 'Linh Park',
      pubYear: '2022',
      isbn: '9781984822178',
      genre: 'Adventure',
      desc: 'An estranged father and daughter search for a lost map hidden in a museum vault.',
    },
    {
      id: 'b-009',
      title: 'Arithmetic of Rain',
      author: 'Satoshi Kuroda',
      pubYear: '2015',
      isbn: '9780399178611',
      genre: 'Contemporary',
      desc: 'A math teacher learns to grieve while tutoring a prodigy who refuses to speak.',
    },
    {
      id: 'b-010',
      title: 'Midnight Survey',
      author: 'Ava Grant',
      pubYear: '2024',
      isbn: '9780593498147',
      genre: 'Speculative',
      desc: 'City planners gather at night to chart a metropolis that appears only at 12:01 a.m.',
    },
  ];

  trackById(_: number, book: Book){
    return book.id;
  }
}
