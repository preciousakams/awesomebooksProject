/* eslint-disable max-classes-per-file */

const btnList = document.querySelector('#btn-list');
const addNewBtn = document.querySelector('#btn-add-new');
const contactBtn = document.querySelector('#btn-contact');

const listSection = document.querySelector('.list');
const addNewSection = document.querySelector('.addNew');
const contactSection = document.querySelector('.contact');

btnList.addEventListener('click', () => {
  btnList.classList.add('active');
  btnList.classList.remove('inActive');
  addNewBtn.classList.remove('active');
  addNewBtn.classList.add('inctive');
  contactBtn.classList.remove('active');
  contactBtn.classList.add('inActive');
  listSection.style.display = 'block';
  addNewSection.style.display = 'none';
  contactSection.style.display = 'none';
});

addNewBtn.addEventListener('click', () => {
  btnList.classList.remove('active');
  btnList.classList.add('inActive');
  addNewBtn.classList.add('active');
  addNewBtn.classList.remove('inActive');
  contactBtn.classList.remove('active');
  contactBtn.classList.add('inActive');
  listSection.style.display = 'none';
  addNewSection.style.display = 'block';
  contactSection.style.display = 'none';
});

contactBtn.addEventListener('click', () => {
  btnList.classList.remove('active');
  btnList.classList.add('inActive');
  addNewBtn.classList.remove('active');
  addNewBtn.classList.add('inActive');
  contactBtn.classList.add('active');
  contactBtn.classList.remove('inActive');
  listSection.style.display = 'none';
  addNewSection.style.display = 'none';
  contactSection.style.display = 'flex';
});

function formatAMPM(date) {
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  // eslint-disable-next-line no-use-before-define
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const strTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  return strTime;
}

function displayClock() {
  const display = new Date(); // .toLocaleTimeString();
  const month = display.getUTCMonth() + 1;
  const day = display.getUTCDate();
  const year = display.getUTCFullYear();
  const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
  const showTime = `${monthName[month - 1]} ${day}th ${year} ${formatAMPM(display)}`;
  document.getElementById('clock').innerHTML = showTime;
  setTimeout(displayClock, 1000);
}

window.onload = displayClock();

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
    const bookRow = document.createElement('tr');
    bookRow.innerHTML = `<th id="th1">${book.title}</th>
      <th id="th2">${`by ${book.author}`}</th>
     <th id="th3"> <button class="delete">Remove</button></th>
      `;
    list.appendChild(bookRow);
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

  const book = new Book(title, author);
  BookUI.addBooks(book);
  BookList.addItem(book);
  BookUI.clearFilds();
});
document.getElementById('book-Collection').addEventListener('click', (e) => {
  BookUI.deleteBook(e.target);
  // eslint-disable-next-line max-len
  BookList.deleteItem(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
});