/* eslint-disable no-alert */
/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList {
  static getList() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addItem(book) {
    const books = BookList.getList();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static deleteItem(title) {
    const books = BookList.getList();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class BookUI {
  static displayBooks() {
    const books = BookList.getList();
    books.forEach((book) => BookUI.addBooks(book));
  }

  static addBooks(book) {
    const list = document.querySelector('#book-Collection');
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `<h4>${book.title}</h4>
      <h4>${book.author}</h4>
     <h4> <a href="#" class="delete">Remove</a></h4>
      <hr>`;
    list.appendChild(bookDiv);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFilds() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', BookUI.displayBooks);
document.querySelector('#bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  if (title === '' || author === '') {
    alert('Please fill in all fields!');
  } else {
    const book = new Book(title, author);
    BookUI.addBooks(book);
    BookList.addItem(book);
    alert('Book added');
    BookUI.clearFilds();
  }
});
document.getElementById('book-Collection').addEventListener('click', (e) => {
  BookUI.deleteBook(e.target);
  // eslint-disable-next-line max-len
  BookList.deleteItem(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
  alert('Book Removed');
});