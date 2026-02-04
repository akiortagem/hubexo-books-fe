import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksFormComponent } from './books-form-component';

describe('BooksFormComponent', () => {
  let component: BooksFormComponent;
  let fixture: ComponentFixture<BooksFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
